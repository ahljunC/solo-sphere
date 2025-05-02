import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { User } from '@/types/auth';
import {
  signInWithEmail,
  signUpWithEmail,
  signOut as authSignOut,
  resetPassword as authResetPassword,
  getUser
} from '@/lib/auth';

/**
 * Authentication context state
 */
interface AuthContextType {
  /**
   * Current authenticated user or null if not authenticated
   */
  user: User | null;
  
  isLoading: boolean;
  
  signIn: (email: string, password: string) => Promise<void>;
  
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;

  signOut: () => Promise<void>;

  resetPassword: (email: string) => Promise<void>;
  
  updateProfile: (data: Partial<User>) => Promise<void>;
}

/**
 * Create the authentication context with default values
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => { throw new Error('AuthContext not initialized'); },
  signUp: async () => { throw new Error('AuthContext not initialized'); },
  signInWithProvider: async () => { throw new Error('AuthContext not initialized'); },
  signOut: async () => { throw new Error('AuthContext not initialized'); },
  resetPassword: async () => { throw new Error('AuthContext not initialized'); },
  updateProfile: async () => { throw new Error('AuthContext not initialized'); },
});

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider Component
 * 
 * Provides authentication state and methods to all child components.
 * Handles initialization, persistence, and auth state changes.
 * 
 * Security features:
 * - Leverages Supabase's built-in security mechanisms
 * - Uses HTTP-only cookies for session management
 * - Implements proper error handling and validation
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  /**
   * Map Supabase user to our application user model
   */
  const mapSupabaseUser = useCallback((supabaseUser: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name,
      avatarUrl: supabaseUser.user_metadata?.avatar_url,
      createdAt: supabaseUser.created_at ? new Date(supabaseUser.created_at) : undefined,
      lastLogin: supabaseUser.last_sign_in_at ? new Date(supabaseUser.last_sign_in_at) : undefined,
    };
  }, []);
  
  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session) {
          const userData = await getUser();
          if (userData?.user) {
            setUser(mapSupabaseUser(userData.user));
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [mapSupabaseUser]);

  /**
   * Sign in with email and password
   * Enhanced with better error handling and security features
   */
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Use auth utility function
      const { data, error } = await signInWithEmail(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        setUser(mapSupabaseUser(data.user));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   * With improved security and data validation
   */
  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Using the utility function but adding options for user metadata and redirect
      const { data, error } = await signUpWithEmail(email, password);
      
      if (error) throw error;
      
      // If user has name metadata to add and signup was successful
      if (data.user && name) {
        await supabase.auth.updateUser({
          data: { name }
        });
      }
      
      if (data.user) {
        setUser(mapSupabaseUser(data.user));
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in with a social provider
   * Using Supabase OAuth flow
   */
  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // Request additional scopes if needed
          scopes: provider === 'google' ? 'profile email' : undefined,
        },
      });
      
      if (error) throw error;
      
      // The OAuth flow will redirect the user away from the app
      // The user will be set via the onAuthStateChange listener when they return
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await authSignOut();
      
      if (error) throw error;
      
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset password for a given email
   */
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await authResetPassword(email);
      
      if (error) throw error;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the current user's profile
   */
  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatarUrl,
        },
      });
      
      if (error) throw error;
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Define the context value with all state and methods
  const contextValue: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Custom hook to protect routes that require authentication
 */
export const useRequireAuth = (redirectUrl = '/auth/login') => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectUrl);
    }
  }, [user, isLoading, router, redirectUrl]);

  return { user, isLoading };
};