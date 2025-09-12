import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// IMPORTANT: Replace with your actual email address
const ADMIN_EMAIL = process.env.ADMIN_Email;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Debug session token
  console.log(`Middleware processing ${pathname}:`, { 
    hasToken: !!token,
    email: token?.email,
    role: token?.role 
  });

  // Protected API routes
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/user')) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  // Restrict become-admin page to only the admin email user
  if (pathname.startsWith('/become-admin')) {
    if (!token || token.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protected user routes
  if (pathname.startsWith('/account')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/user/:path*',
    '/account/:path*',
    '/become-admin',
    '/checkout/:path*'
  ],
}; 