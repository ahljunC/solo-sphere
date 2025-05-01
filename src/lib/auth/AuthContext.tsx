import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * User object structure
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

/**
 * Authentication context state
 */
interface AuthContextType {
  /**
   * Current authenticated user or null if not authenticated
   */
  user: User | null;
  
  /**
   * Whether the auth state is currently loading
   */
  isLoading: boolean;
  
  /**
   * Log in with email and password
   */
  signIn: (email: string, password: string) => Promise<void>;
  
  /**
   * Register a new user with email and password
   */
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  
  /**
   * Sign in with a social provider
   */
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>;
  
  /**
   * Log out the current user
   */
  signOut: () => Promise<void>;
  
  /**
   * Reset password for a given email
   */
  resetPassword: (email: string) => Promise<void>;
  
  /**
   * Update the current user's profile
   */
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
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a real implementation, this would check for an existing session
        // For demonstration, we'll simulate a check for a stored user in localStorage
        const storedUser = localStorage.getItem('authUser');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear any potentially corrupted auth state
        localStorage.removeItem('authUser');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an authentication API
      // For demonstration, we'll simulate a successful auth after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '123456',
        email,
        name: email.split('@')[0],
      };
      
      // Set the user in state and localStorage
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   */
  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call a registration API
      // For demonstration, we'll simulate a successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '123456',
        email,
        name: name || email.split('@')[0],
      };
      
      // Set the user in state and localStorage
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in with a social provider
   */
  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would initiate OAuth with the provider
      // For demonstration, we'll simulate a successful auth after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '123456',
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        avatarUrl: `https://via.placeholder.com/150?text=${provider.charAt(0).toUpperCase()}`,
      };
      
      // Set the user in state and localStorage
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
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
      // In a real implementation, this would call a logout API
      // For demonstration, we'll simulate a successful logout after a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear the user from state and localStorage
      setUser(null);
      localStorage.removeItem('authUser');
      
      // Redirect to login page
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
      // In a real implementation, this would call a password reset API
      // For demonstration, we'll simulate a successful request after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would send a password reset email
      console.log(`Password reset email sent to: ${email}`);
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
      // In a real implementation, this would call a profile update API
      // For demonstration, we'll simulate a successful update after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user in state and localStorage
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
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