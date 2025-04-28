'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUpWithEmail } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'
import { SocialLogin } from '@/components/auth/SocialLogin'
import { LoginBackground } from '@/components/auth/LoginBackground'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }
    
    setIsLoading(true)

    try {
      const { data, error } = await signUpWithEmail(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        // Redirect to login or dashboard depending on email confirmation setting
        router.push('/auth/login?registered=true')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Registration form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Create an account
              </h1>
              <p className="text-sm text-gray-500">
                Sign up to start managing your freelance business
              </p>
            </div>
            
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
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
              
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              
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
                Create Account
              </Button>
            </form>
            
            <Divider text="Or continue with" className="py-2" />
            
            <SocialLogin onError={setError} />
            
            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in
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
    </div>
  )
}