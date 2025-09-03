import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const res = await fetch(`${process.env.API_BASE}/v1/yeshtery/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, isEmployee: true }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || !data?.token) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: res.status || 400 }
    )
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: process.env.AUTH_COOKIE || 'access_token',
    value: data.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })

  return response
}
