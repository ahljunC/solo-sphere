'use client'

import { useState } from 'react'
<<<<<<< HEAD
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
=======
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
>>>>>>> 9ca1f57 (Resolve merge conflicts between feature-login/registration and main)
import { signInWithEmail } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { LoginBackground } from '@/components/auth/LoginBackground'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

<<<<<<< HEAD
    console.log("Login response:", data, error)

    if (error) {
      setError(error.message)
    } else {
      // Redirect or show success
      // window.location.href = '/'
      console.log("Login successful:", data)
>>>>>>> efdb4ad (add routing and middleware)
=======
    try {
      const { data, error } = await signInWithEmail(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
>>>>>>> 9ca1f57 (Resolve merge conflicts between feature-login/registration and main)
    }
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back!
              </h1>
              <p className="text-sm text-gray-500">
                Log in to your SoloSphere account
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              
              {error && (
                <div className="rounded-md bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth={true}
                isLoading={isLoading}
              >
                Login
              </Button>
            </form>
            
            <Divider text="Or continue with" className="py-2" />
            
            <SocialLogin onError={setError} />
            
            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Background with overlay text */}
      <div className="relative hidden md:block md:w-1/2">
        <LoginBackground />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold">SoloSphere</h2>
          <p className="mt-2 text-xl">Your all-in-one freelance business management platform</p>
        </div>
      </div>
>>>>>>> 9ca1f57 (Resolve merge conflicts between feature-login/registration and main)
    </div>
>>>>>>> efdb4ad (add routing and middleware)
  )
}