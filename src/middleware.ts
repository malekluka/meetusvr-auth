import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.AUTH_COOKIE || 'access_token')?.value
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))
    return NextResponse.next()
  }
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}
export const config = { matcher: ['/dashboard/:path*', '/login'] }

