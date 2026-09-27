import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import { prisma } from '@/lib/db/prisma';

export async function GET(_req: Request, { params }: { params: Promise<{ resource: string }> }) {
  try {
    await requireAdmin();
    const { resource } = await params;
    if (resource === 'services') {
      return NextResponse.json(await prisma.service.findMany({ orderBy: { displayOrder: 'asc' } }));
    }
    if (resource === 'projects') {
      return NextResponse.json(await prisma.project.findMany({ orderBy: { displayOrder: 'asc' } }));
    }
    if (resource === 'promotions') {
      return NextResponse.json(await prisma.promotion.findMany({ orderBy: { displayOrder: 'asc' } }));
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  try {
    await requireAdmin();
    const resource = (await params).resource;
    const body = await req.json();
    delete body.id;
    if (resource === 'services') {
      return NextResponse.json(await prisma.service.create({ data: { title: body.title, slug: body.slug, shortDescription: body.shortDescription || '', fullDescription: body.fullDescription || '', icon: body.icon || null, imageUrl: body.imageUrl || null, published: body.published !== false, displayOrder: Number(body.displayOrder) || 0 } }), { status: 201 });
    }
    if (resource === 'projects') {
      return NextResponse.json(await prisma.project.create({ data: { title: body.title, slug: body.slug, description: body.description || '', imageUrl: body.imageUrl || null, url: body.url || null, category: body.category || null, technologies: body.technologies || [], published: body.published !== false, displayOrder: Number(body.displayOrder) || 0 } }), { status: 201 });
    }
    if (resource === 'promotions') {
      return NextResponse.json(await prisma.promotion.create({ data: { title: body.title, description: body.description || '', imageUrl: body.imageUrl || null, ctaText: body.ctaText || null, ctaUrl: body.ctaUrl || null, published: body.published !== false, displayOrder: Number(body.displayOrder) || 0 } }), { status: 201 });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  try {
    await requireAdmin();
    const resource = (await params).resource;
    const body = await req.json();
    const { id, ...rest } = body;
    if (typeof id !== 'string') return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const data = { ...rest, displayOrder: Number(rest.displayOrder) || 0 };
    if (resource === 'services') return NextResponse.json(await prisma.service.update({ where: { id }, data }));
    if (resource === 'projects') return NextResponse.json(await prisma.project.update({ where: { id }, data }));
    if (resource === 'promotions') return NextResponse.json(await prisma.promotion.update({ where: { id }, data }));
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  try {
    await requireAdmin();
    const resource = (await params).resource;
    const { id } = await req.json();
    if (resource === 'services') await prisma.service.delete({ where: { id } });
    else if (resource === 'projects') await prisma.project.delete({ where: { id } });
    else if (resource === 'promotions') await prisma.promotion.delete({ where: { id } });
    else return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  }
}
