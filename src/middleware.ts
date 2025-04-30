import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sb-access-token')?.value

  // Define protected routes
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/invoices') ||
    request.nextUrl.pathname.startsWith('/clients') ||
    request.nextUrl.pathname.startsWith('/expenses') ||
    request.nextUrl.pathname.startsWith('/time-tracking') ||
    request.nextUrl.pathname.startsWith('/reports') ||
    request.nextUrl.pathname.startsWith('/settings')

  // If trying to access a protected route without being authenticated, redirect
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next(); // Allow access if authenticated
}

// Apply middleware to multiple paths
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/invoices/:path*', 
    '/clients/:path*', 
    '/expenses/:path*', 
    '/time-tracking/:path*', 
    '/reports/:path*', 
    '/settings/:path*'
],
}
