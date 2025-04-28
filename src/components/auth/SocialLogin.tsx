'use client'

import { useState } from 'react'
import { signInWithGoogle, signInWithFacebook, signInWithLinkedIn } from '@/lib/auth'
import { Button } from '@/components/ui/Button'

interface SocialLoginProps {
  onError: (error: string) => void;
}

export function SocialLogin({ onError }: SocialLoginProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSocialLogin = async (
    provider: 'google' | 'facebook' | 'linkedin',
    authFn: () => Promise<any>
  ) => {
    setIsLoading(provider)
    try {
      const { error } = await authFn()
      if (error) onError(error.message)
    } catch (err) {
      onError(`Failed to connect with ${provider}`)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={isLoading === 'google'}
        onClick={() => handleSocialLogin('google', signInWithGoogle)}
        className="flex items-center justify-center space-x-2"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>
      
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={isLoading === 'facebook'}
        onClick={() => handleSocialLogin('facebook', signInWithFacebook)}
        className="flex items-center justify-center space-x-2"
      >
        <FacebookIcon className="h-5 w-5" />
        <span>Continue with Facebook</span>
      </Button>
      
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={isLoading === 'linkedin'}
        onClick={() => handleSocialLogin('linkedin', signInWithLinkedIn)}
        className="flex items-center justify-center space-x-2"
      >
        <LinkedInIcon className="h-5 w-5" />
        <span>Continue with LinkedIn</span>
      </Button>
    </div>
  )
}

// Icon components
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="#0077B5" />
    </svg>
  )
}