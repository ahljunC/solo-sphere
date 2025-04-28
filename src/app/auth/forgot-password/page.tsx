'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await resetPassword(email)
      
      if (error) {
        setError(error.message)
      } else {
        setIsSubmitted(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-md p-8">
          <h1 className="mb-4 text-center text-2xl font-bold">Check your email</h1>
          <p className="mb-6 text-center text-gray-600">
            We've sent you an email with a link to reset your password.
            Please check your inbox and follow the instructions.
          </p>
          <Button 
            variant="outline" 
            fullWidth 
            onClick={() => setIsSubmitted(false)}
          >
            Try again
          </Button>
          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
          <Input
            id="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Send reset link
          </Button>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}