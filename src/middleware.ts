import { decrypt } from '@/lib/session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session');
  if (!cookie) return NextResponse.redirect(new URL('/login', req.nextUrl));
  if (await decrypt(cookie.value) !== "soporte") return NextResponse.redirect(new URL('/login', req.nextUrl));
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/data|login$|api/auth/login$).*)',
  ],
};
