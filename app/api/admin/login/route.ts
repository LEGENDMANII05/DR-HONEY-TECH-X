import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { ensureInitialAdmin } from '@/lib/auth/admin';
import { setSession } from '@/lib/auth/session';
import { z } from 'zod';

const schema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function getClientKey(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(req: Request) {
  const key = getClientKey(req);
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many login attempts. Try again later.', code: 'RATE_LIMITED' }, { status: 429 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request.', code: 'INVALID_REQUEST' }, { status: 400 });
  }

  try {
    const bootstrap = await ensureInitialAdmin();
    const user = await prisma.user.findUnique({ where: { username: body.username } });
    const valid = !!user && user.isActive && (await verifyPassword(body.password, user.passwordHash));

    if (!valid) {
      // Recovery path: when the deployment environment is configured with the
      // bootstrap credentials and ADMIN_FORCE_SYNC=true, the password above
      // can repair a stale database hash for the same bootstrap username.
      if (process.env.ADMIN_FORCE_SYNC === 'true' &&
          body.username === process.env.ADMIN_USERNAME &&
          body.password === process.env.ADMIN_PASSWORD &&
          bootstrap.username === body.username) {
        await ensureInitialAdmin();
        const repaired = await prisma.user.findUnique({ where: { username: body.username } });
        if (repaired) {
          await setSession(repaired.id);
          attempts.delete(key);
          return NextResponse.json({ ok: true, recovered: true });
        }
      }
      const next = current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + WINDOW_MS };
      attempts.set(key, next);
      return NextResponse.json({ error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' }, { status: 401 });
    }

    attempts.delete(key);
    await setSession(user.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message === 'ADMIN_ENV_MISSING' || message === 'ADMIN_PASSWORD_TOO_SHORT') {
      return NextResponse.json({ error: 'Admin environment variables are not configured correctly.', code: message }, { status: 503 });
    }
    if (message === 'AUTH_SECRET must be at least 32 characters') {
      return NextResponse.json({ error: 'AUTH_SECRET is missing or too short.', code: 'AUTH_SECRET_INVALID' }, { status: 503 });
    }
    console.error('Admin login failed:', error);
    return NextResponse.json({ error: 'Admin database/authentication is not available.', code: 'ADMIN_BACKEND_UNAVAILABLE' }, { status: 503 });
  }
}
