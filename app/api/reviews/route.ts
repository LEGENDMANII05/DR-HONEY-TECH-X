import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

const schema = z.object({
  name: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(120).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(100).optional().or(z.literal('')),
  comment: z.string().trim().min(5).max(1200),
  page: z.string().trim().max(80).optional().or(z.literal('')),
});

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
    select: { id: true, name: true, rating: true, title: true, comment: true, page: true, createdAt: true },
  });
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const review = await prisma.review.create({
      data: {
        name: data.name,
        email: data.email || null,
        rating: data.rating,
        title: data.title || null,
        comment: data.comment,
        page: data.page || 'Website',
        published: true,
      },
      select: { id: true, name: true, rating: true, title: true, comment: true, page: true, createdAt: true },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Please check your review details.' }, { status: 400 });
    return NextResponse.json({ error: 'Review service is temporarily unavailable.' }, { status: 500 });
  }
}
