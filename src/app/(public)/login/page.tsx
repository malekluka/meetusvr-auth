'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginValues } from '@/lib/validators'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
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
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 p-6 rounded-lg shadow bg-white"
      >
        <h1 className="text-xl font-bold">Login</h1>

        {apiError && <p className="text-red-500">{apiError}</p>}

        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

                <Input
                    label="Password"
                    type="password"
                    {...register('password')}
                  error={errors.password?.message}
              />
              <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!isValid}
                  fullWidth
              >
                  Login
              </Button>
            </form>
        </main>
    )
}
