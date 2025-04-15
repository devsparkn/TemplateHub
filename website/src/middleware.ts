import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Get the pathname from the request
    const { pathname } = request.nextUrl;
    
    // Get user from token
    const user = request.nextauth.token;
    
    // Check if user is trying to access admin routes
    if (pathname.startsWith('/admin') && user?.role !== 'admin') {
      // Redirect to home page if not admin
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Allow access to normal routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User is authorized if they have a token
    },
  }
);

// Specify which routes should be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/account/:path*',
    '/api/admin/:path*',
  ],
}; 