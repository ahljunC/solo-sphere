'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { AuthForm, AuthField } from '@/components/auth/AuthForm'
import { Divider } from '@/components/ui/Divider'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const { signUp, isLoading } = useAuth()
  const router = useRouter()

  // Define form fields
  const registerFields: AuthField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      autoComplete: 'email',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Create a password',
      autoComplete: 'new-password',
      required: true
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      autoComplete: 'new-password',
      required: true
    }
  ]

  const handleRegister = async (values: Record<string, string>) => {
    setError(null)
    
    // Validate passwords match
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    // Validate password strength
    if (values.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    
    const { success, error } = await signUp(values.email, values.password)
    
    if (success) {
      router.push('/auth/login?registered=true')
    } else if (error) {
      setError(error)
    }
  }

  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Sign up to start managing your freelance business"
    >
      <AuthForm
        fields={registerFields}
        onSubmit={handleRegister}
        submitButtonText="Create Account"
        isLoading={isLoading}
        error={error}
      />
      
      <Divider text="Or continue with" className="py-2" />
      
      <SocialLogin onError={setError} />
      
      <div className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Log in
        </Link>
      </div>
    </AuthLayout>
  )
}