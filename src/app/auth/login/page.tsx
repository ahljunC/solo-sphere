'use client'

import { useState } from 'react'
<<<<<<< HEAD
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
=======
import { signInWithEmail } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    const { data, error } = await signInWithEmail(email, password)

    console.log("Login response:", data, error)

    if (error) {
      setError(error.message)
    } else {
      // Redirect or show success
      // window.location.href = '/'
      console.log("Login successful:", data)
>>>>>>> efdb4ad (add routing and middleware)
    }
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        className="border p-2 mb-4 block w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-4 block w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Log In
      </button>
    </div>
>>>>>>> efdb4ad (add routing and middleware)
  )
}