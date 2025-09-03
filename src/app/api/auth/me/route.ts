import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  // In Next 15, cookies() may return a Promise
  const cookieStore = await cookies()
  const token = cookieStore.get(process.env.AUTH_COOKIE || 'access_token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.API_BASE}/v1/user/info`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json({ id: data.id, name: data.name })
}
