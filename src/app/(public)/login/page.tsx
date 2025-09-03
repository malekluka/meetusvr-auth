'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginValues } from '@/lib/validators'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/store/auth'

export default function LoginPage() {
  const router = useRouter()
  const search = useSearchParams()
  const redirectTo = search.get('from') || '/dashboard'
  const setUser = useAuth((s) => s.setUser)
  const [apiError, setApiError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginValues) => {
    setApiError(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) return setApiError('Invalid email or password')

    const me = await fetch('/api/auth/me').then(r => r.json())
    setUser(me)
    router.push(redirectTo)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Full-page decorative background (covers all over) */}        {/* Large spiral placed to the right but contained inside the full height */}
        <div className="absolute inset-y-0 right-0 w-[65%] flex items-center justify-end">
        </div>

        {/* Soft gradient blobs behind the spiral */}
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] bg-gradient-to-tr from-pink-400 via-purple-500 to-blue-400 opacity-40 rounded-full blur-3xl transform rotate-12" />

      {/* Left Side - Form (above the decorative background) */}
      <div className="w-full flex items-center justify-center bg-white bg-opacity-70 z-10">
        <div className="w-full max-w-sm px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl text-gray-900 mb-4 leading-tight">
              Welcome back
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Step into our shopping metaverse for an<br />
              unforgettable shopping experience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{apiError}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-4 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8l-2.5-1.5L11 5a6 6 0 00-6 6h1z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            {/* Sign up link */}
            <p className="text-center text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <button type="button" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Logo area (keeps content above background) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative z-10">
        <div className="relative z-20">
          <div className="relative w-64 h-20 mx-auto">
            <Image
              src="/meetusAR-logo.png"
              alt="MeetusVR Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}