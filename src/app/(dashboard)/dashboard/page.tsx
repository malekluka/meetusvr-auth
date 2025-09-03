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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-gray-800">
                meetus<span className="text-purple-600">VR</span>
              </div>
              <span className="text-sm text-gray-500 border-l border-gray-300 pl-3">
                Dashboard
              </span>
            </div>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-purple-600">{user.name}</span>!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You&apos;re now logged into the MeetusVR shopping metaverse. 
            Your journey into immersive shopping begins here.
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* User ID Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User ID</h3>
                <p className="text-gray-600 font-mono text-sm">{user.id}</p>
              </div>
            </div>
          </div>

          {/* User Name Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Full Name</h3>
                <p className="text-gray-600">{user.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/60 transition-all duration-200">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Stores</h3>
              <p className="text-gray-600 text-sm">Explore immersive shopping experiences</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/60 transition-all duration-200">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My Orders</h3>
              <p className="text-gray-600 text-sm">Track your virtual purchases</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/60 transition-all duration-200">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600 text-sm">Customize your VR experience</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}