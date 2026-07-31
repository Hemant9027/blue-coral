import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthCookie, getAuthCookieName } from '@/lib/crm-auth';

function unauthorized() {
  const response = new NextResponse('Unauthorized', {
    status: 401,
  });
  response.headers.set('Location', '/crm-login');
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/crm-login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/crm-login')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/crm') || pathname.startsWith('/api/crm')) {
    const cookie = request.cookies.get(getAuthCookieName())?.value;
    if (!await verifyAuthCookie(cookie)) {
      return unauthorized();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*', '/api/crm/:path*'],
};
