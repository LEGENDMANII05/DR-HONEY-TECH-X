import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    const hasSessionCookie = Boolean(req.cookies.get('dr_honey_session')?.value);
    if (!hasSessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const hasSessionCookie = Boolean(req.cookies.get('dr_honey_session')?.value);
    if (!hasSessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(),microphone=(),geolocation=()');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  return response;
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
