import { prisma } from '@/lib/db/prisma';
import { getSession } from './session';
import { hashPassword } from './password';

export async function requireAdmin() {
  const id = await getSession();
  if (!id) throw new Error('UNAUTHORIZED');

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || !user.isActive || user.role !== 'ADMIN') throw new Error('FORBIDDEN');
  return user;
}

/**
 * Creates or, when ADMIN_FORCE_SYNC=true, synchronizes the bootstrap admin
 * from environment variables. This is intentionally server-only.
 */
export async function ensureInitialAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) throw new Error('ADMIN_ENV_MISSING');
  if (password.length < 8) throw new Error('ADMIN_PASSWORD_TOO_SHORT');

  const existing = await prisma.user.findUnique({ where: { username } });
  if (!existing) {
    return prisma.user.create({
      data: {
        username,
        passwordHash: await hashPassword(password),
        role: 'ADMIN',
        isActive: true,
      },
    });
  }

  if (process.env.ADMIN_FORCE_SYNC === 'true' && existing.role === 'ADMIN') {
    return prisma.user.update({
      where: { id: existing.id },
      data: { passwordHash: await hashPassword(password), isActive: true },
    });
  }

  return existing;
}
