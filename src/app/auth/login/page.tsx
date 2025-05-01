'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { AuthForm, AuthField } from '@/components/auth/AuthForm'
import { Divider } from '@/components/ui/Divider'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const { signIn, isLoading } = useAuth()
  const router = useRouter()

  // Define form fields
  const loginFields: AuthField[] = [
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
      placeholder: 'Enter your password',
      autoComplete: 'current-password',
      required: true
    }
  ]

  const handleLogin = async (values: Record<string, string>) => {
    setError(null)
    const { success, error } = await signIn(values.email, values.password)
    
    if (success) {
      router.push('/dashboard')
    } else if (error) {
      setError(error)
    }
  }

  return (
    <AuthLayout 
      title="Welcome back!"
      subtitle="Log in to your SoloSphere account"
    >
      <AuthForm
        fields={loginFields}
        onSubmit={handleLogin}
        submitButtonText="Login"
        isLoading={isLoading}
        error={error}
      />
      
      <Divider text="Or continue with" className="py-2" />
      
      <SocialLogin onError={setError} />
      
      <div className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Create account
        </Link>
      </div>
    </AuthLayout>
  )
}