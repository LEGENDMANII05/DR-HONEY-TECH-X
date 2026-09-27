import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE = process.env.NODE_ENV === 'production' ? '__Host-dr_honey_session' : 'dr_honey_session';
const MAX_AGE = 8 * 60 * 60;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error('AUTH_SECRET must be at least 32 characters');
  return secret;
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

export async function setSession(userId: string) {
  const raw = `${userId}.${Date.now()}`;
  const token = `${raw}.${sign(raw)}`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [userId, ts, sig] = token.split('.');
  const timestamp = Number(ts);
  if (!userId || !ts || !sig || !Number.isFinite(timestamp)) return null;
  if (!safeEqual(sig, sign(`${userId}.${ts}`))) return null;
  if (Date.now() - timestamp > MAX_AGE * 1000 || timestamp > Date.now() + 60_000) return null;
  return userId;
}
