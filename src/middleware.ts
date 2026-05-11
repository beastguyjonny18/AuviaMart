import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_EMAIL = 'sololvlar@gmail.com';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Protect dashboard routes (ADMIN ONLY)
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    try {
      const payloadBase64 = session.value.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

      if (payload.email !== ADMIN_EMAIL) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Handle users visiting auth pages
  if (pathname.startsWith('/auth')) {
    if (session) {
      try {
        const payloadBase64 = session.value.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        
        // If admin, go to dashboard. If normal user, go to home.
        const dest = payload.email === ADMIN_EMAIL ? '/dashboard' : '/';
        return NextResponse.redirect(new URL(dest, request.url));
      } catch {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
