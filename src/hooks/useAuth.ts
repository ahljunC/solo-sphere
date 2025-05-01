'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import * as authService from '@/services/authService'

export type AuthUser = Omit<User, 'email'> & {
  email: string | null;
}

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth(redirectTo?: string) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  })
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: user, error } = await authService.getUser()
        
        if (error) {
          setAuthState({
            user: null,
            isLoading: false,
            error: error.message
          })
          
          if (redirectTo) {
            router.replace(redirectTo)
          }
          return
        }
        
        setAuthState({
          user: user as AuthUser,
          isLoading: false,
          error: null
        })
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'An unexpected error occurred'
        })
        
        if (redirectTo) {
          router.replace(redirectTo)
        }
      }
    }

    loadUser()
  }, [router, redirectTo])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { data, error } = await authService.signInWithEmail(email, password)
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }))
      return { success: false, error: error.message }
    }
    
    // Refresh user data
    const { data: user } = await authService.getUser()
    
    setAuthState({
      user: user as AuthUser,
      isLoading: false,
      error: null
    })
    
    return { success: true, data }
  }

  const signInWithProvider = async (provider: 'google' | 'facebook' | 'linkedin') => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { error } = await authService.signInWithProvider(provider)
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }))
      return { success: false, error: error.message }
    }
    
    // For OAuth, we don't need to update the user state here
    // as the user will be redirected to the provider's page
    return { success: true }
  }

  const signUp = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { data, error } = await authService.signUpWithEmail(email, password)
    
    setAuthState(prev => ({ ...prev, isLoading: false, error: error?.message || null }))
    
    return { success: !error, data, error: error?.message }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    const { error } = await authService.signOut()
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }))
      return false
    }
    
    setAuthState({
      user: null,
      isLoading: false,
      error: null
    })
    
    return true
  }

  const resetUserPassword = async (email: string) => {
    const { error } = await authService.resetPassword(email)
    return { success: !error, error: error?.message }
  }

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    signIn,
    signInWithProvider,
    signUp,
    signOut,
    resetUserPassword
  }
}