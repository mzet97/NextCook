import { NextResponse } from 'next/server';

export function middleware() {
  // Simply pass through all requests without locale routing
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};