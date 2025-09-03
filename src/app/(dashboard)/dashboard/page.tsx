import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(process.env.AUTH_COOKIE || 'access_token')?.value

  if (!token) redirect('/login')

  const res = await fetch(`${process.env.API_BASE}/v1/user/info`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store', // always fresh
  })

  if (!res.ok) redirect('/login')

  const user = await res.json()

  return (
    <main className="p-6">
      <h1>Welcome, {user.name}</h1>
      <form action="/api/auth/logout" method="post">
        <button type="submit">Logout</button>
      </form>
    </main>
  )
}
