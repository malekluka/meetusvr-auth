import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))

  response.cookies.set({
    name: process.env.AUTH_COOKIE || 'access_token',
    value: '',
    path: '/',
    maxAge: 0, // expire immediately
  })

  return response
}
