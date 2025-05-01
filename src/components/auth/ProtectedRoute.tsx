'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  loadingComponent?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login',
  loadingComponent
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }
    
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  // If not authenticated and not loading, don't render anything
  if (!user) {
    return null
  }

  // User is authenticated, render children
  return <>{children}</>
}