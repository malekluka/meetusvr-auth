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
    <div className="min-h-screen flex bg-[#E9ECF2] relative overflow-hidden">

      {/* Decorative blurred circles (Figma-like) */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* NEW: top-right blurred circle (from your SVG) */}
        <svg
          className="absolute -right-28 -top-40 w-[1202px] h-[820px] opacity-70"
          viewBox="0 0 1202 820"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g filter="url(#filter_extra_top_right)">
            <circle cx="733.5" cy="86.5" r="333.5" fill="#E477F6" />
          </g>
          <defs>
            <filter id="filter_extra_top_right" x="0" y="-647" width="1467" height="1467" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_extra_top_right" />
            </filter>
          </defs>
        </svg>

        {/* top-left blurred circle */}
        <svg
          className="absolute -left-64 -top-64 w-[1440px] h-[1024px] opacity-60"
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g opacity="0.6" filter="url(#filter_top_left)">
            <circle cx="441.5" cy="31.5" r="403.5" fill="#9E77F6" />
          </g>
          <defs>
            <filter id="filter_top_left" x="-762" y="-1172" width="2407" height="2407" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_top_left" />
            </filter>
          </defs>
        </svg>

        {/* bottom-left blurred circle */}
        <svg
          className="absolute -left-72 -bottom-64 w-[1440px] h-[1024px] opacity-60"
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g opacity="0.6" filter="url(#filter_bottom_left)">
            <circle cx="289.5" cy="1052.5" r="406.5" fill="#B0D2E5" />
          </g>
          <defs>
            <filter id="filter_bottom_left" x="-917" y="-154" width="2413" height="2413" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_bottom_left" />
            </filter>
          </defs>
        </svg>

        {/* bottom-right blurred circle */}
        <svg
          className="absolute right-[-80px] bottom-[-80px] w-[757px] h-[757px] opacity-90"
          viewBox="0 0 757 757"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g filter="url(#filter_bottom_right)">
            <circle cx="733.5" cy="733.5" r="333.5" fill="#9E77F6" />
          </g>
          <defs>
            <filter id="filter_bottom_right" x="0" y="0" width="1467" height="1467" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_bottom_right" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Left Side - Form (above the decorative background) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
  <div className="w-full max-w-md px-8">
    {/* Header */}
    <div className="mb-12">
      <h1 className="font-[ABeeZee] font-normal text-[56px] leading-[100%] text-center text-gray-900 mb-6">
        Welcome back
      </h1>
      <p className="font-[ABeeZee] font-normal text-[18px] leading-[155%] text-center text-[#62626B]">
        Step into our shopping metaverse for an unforgettable shopping experience
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
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
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

            {/* Sign up */}
            <p className="mt-6 m-0 text-center text-[#62626B] font-normal text-[14px] leading-[155%] font-[ABeeZee]">
  Don&apos;t have an account? 
  <button type="button" className="hover:underline ml-1">
    Sign up
  </button>
</p>


          </form>
        </div>
      </div>

      {/* Right Side - Logo area (keeps content above background) */}
<div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative z-10">
  <div className="relative z-20 flex flex-col items-center">
    {/* Logo */}
    <div className="relative w-[670px] h-[400px]">
      <Image
        src="/meetusAR-logo.png"
        alt="MeetusVR Logo"
        fill
        priority
        className="object-contain"
      />
    </div>

    {/* Text (closer to logo) */}
    <div className="relative w-64 h-20 -mt-2">
      <Image
        src="/meetusAR-text.png"
        alt="MeetusVR Text"
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