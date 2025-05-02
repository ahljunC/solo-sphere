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
import { validators } from '@/utils/validation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
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
        
        // Early return if no session
        if (!sessionData?.session) {
          setIsLoading(false);
          return;
        }
        
        const userData = await getUser();
        
        // Early return if no user data
        if (!userData?.user) {
          setIsLoading(false);
          return;
        }
        
        setUser(mapSupabaseUser(userData.user));
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

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Use auth utility function
      const { data, error } = await signInWithEmail(email, password);
      
      // Handle error with early return
      if (error) {
        console.error('Login failed:', error);
        throw error;
      }
      
      // Handle missing user data with early return
      if (!data.user) {
        console.error('Login failed: No user data returned');
        throw new Error('Authentication failed');
      }
      
      // Update user state after all checks pass
      setUser(mapSupabaseUser(data.user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // Validate password strength first - early return on validation failure
      const passwordError = validators.password(password);
      if (passwordError) {
        throw new Error(passwordError);
      }
      
      // Attempt to sign up
      const { data, error } = await signUpWithEmail(email, password);
      
      // Early return on signup error
      if (error) {
        throw error;
      }
      
      // Early return if no user data returned
      if (!data.user) {
        throw new Error('Registration failed: No user data returned');
      }
      
      // Update user metadata if name is provided
      if (name) {
        await supabase.auth.updateUser({
          data: { name }
        });
      }
      
      // Set user state after successful registration
      setUser(mapSupabaseUser(data.user));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
      
      // Early return on error
      if (error) {
        console.error(`${provider} login failed:`, error);
        throw error;
      }
      
      // The OAuth flow will redirect the user away from the app
      // The user will be set via the onAuthStateChange listener when they return
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await authSignOut();
      
      // Early return on error
      if (error) {
        console.error('Logout failed:', error);
        throw error;
      }
      
      // Clear user state and redirect
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Validate email format first
      const emailError = validators.email(email);
      if (emailError) {
        throw new Error(emailError);
      }
      
      const { error } = await authResetPassword(email);
      
      // Early return on error
      if (error) {
        console.error('Password reset failed:', error);
        throw error;
      }
      
      // If we get here, password reset email was sent successfully
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    
    try {
      // Early check if user exists
      if (!user) {
        throw new Error('Cannot update profile: No user is currently logged in');
      }
      
      // Update user profile
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatarUrl,
        },
      });
      
      // Early return on error
      if (error) {
        throw error;
      }
      
      // Update local user state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
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

export const useAuth = () => useContext(AuthContext);

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