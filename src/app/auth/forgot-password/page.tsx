'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AuthForm, AuthField } from '@/components/auth/AuthForm'
import { useAuth } from '@/hooks/useAuth'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { resetUserPassword, isLoading } = useAuth()

  // Define form fields
  const forgotPasswordFields: AuthField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter your email address',
      autoComplete: 'email',
      required: true
    }
  ]

  const handleResetPassword = async (values: Record<string, string>) => {
    setError(null)
    const { success, error } = await resetUserPassword(values.email)
    
    if (success) {
      setIsSubmitted(true)
    } else if (error) {
      setError(error)
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

        <div className="mt-8">
          <AuthForm
            fields={forgotPasswordFields}
            onSubmit={handleResetPassword}
            submitButtonText="Send reset link"
            isLoading={isLoading}
            error={error}
          />

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}