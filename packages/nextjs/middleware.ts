import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/coinflip')) {
    // Since we can't access localStorage in middleware, 
    // we'll rely on client-side verification in the page component
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/coinflip/:path*',
};
