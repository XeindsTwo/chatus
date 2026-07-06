import { NextResponse, type NextRequest } from 'next/server';

const prefixedDefaultLocale = '/en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === prefixedDefaultLocale || pathname.startsWith(`${prefixedDefaultLocale}/`)) {
    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname = pathname.replace(prefixedDefaultLocale, '') || '/';
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
