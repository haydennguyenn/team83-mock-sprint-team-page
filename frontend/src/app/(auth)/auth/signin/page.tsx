'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import Image from 'next/image'
import rmitLogo from '@/images/RMIT Logo.png'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="h-screen w-full bg-[#0c1b75] flex items-center justify-center p-4">

      {/* the login space dard */}
      <div className="w-full max-w-[480px] bg-white rounded-lg shadow-2xl p-8 space-y-6">

        {/* head and rmit logo */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-800">Welcome</h1>
            <p className="text-xs text-zinc-500 mt-1">Sign in to view the team</p>
          </div>
          <div className="flex flex-col items-end">
            <Image
              src={rmitLogo}
              alt="RMIT University"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </div>


        {/* Forms */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* username*/}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-800">
              Username
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#0c1b75] focus:ring-1 focus:ring-[#0c1b75] outline-none placeholder:text-zinc-400"
              placeholder=""
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-zinc-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#0c1b75] focus:ring-1 focus:ring-[#0c1b75] outline-none placeholder:text-zinc-400"
              placeholder=""
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/*Sign In and Create Account */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-md bg-[#0c1b75] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f258e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
            <Link
              href="/auth/signup"
              className="flex-1 rounded-md bg-[#0c1b75] px-4 py-2.5 text-sm font-medium text-white text-center transition-colors hover:bg-[#0f258e]"
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Google_login */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-zinc-400 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}