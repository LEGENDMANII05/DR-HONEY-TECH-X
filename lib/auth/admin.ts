import { prisma } from '@/lib/db/prisma'; import { getSession } from './session';
export async function requireAdmin(){const id=await getSession();if(!id)throw new Error('UNAUTHORIZED');const user=await prisma.user.findUnique({where:{id}});if(!user||!user.isActive||user.role!=='ADMIN')throw new Error('FORBIDDEN');return user;}
