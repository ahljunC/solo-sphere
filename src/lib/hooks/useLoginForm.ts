import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth';
import { LoginFormState, ValidationError, UIState } from '@/types/auth';

/**
 * Hook for managing login form state and logic
 * 
 * This hook encapsulates all the state management and business logic
 * related to the login form, providing a clean separation between
 * the UI components and the application logic.
 * 
 * Features:
 * - Type-safe state management
 * - Robust form validation
 * - Specific error messaging
 * - Loading state handling
 * - Support for social authentication
 * 
 * @param redirectUrl URL to redirect to after successful login
 * @param onSuccess Optional callback for successful login
 * @param onError Optional callback for login error
 */
export function useLoginForm(
  redirectUrl = '/dashboard',
  onSuccess?: () => void,
  onError?: (error: Error) => void
) {
  const router = useRouter();
  const { signIn, signInWithProvider } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state with improved error handling
  const [uiState, setUiState] = useState<UIState>({
    isLoading: false,
    error: null,
    feedbackMessage: null,
    feedbackType: null
  });
  
  /**
   * Type-safe update function for form fields
   * Clears field errors when user starts typing
   */
  const updateField = useCallback(<K extends keyof LoginFormState>(
    field: K, 
    value: LoginFormState[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific errors when user starts typing
    if (uiState.error?.field === field) {
      setUiState(prev => ({ ...prev, error: null }));
    }
  }, [uiState.error]);
  
  /**
   * Enhanced form validation with email format checking
   */
  const validateForm = useCallback((): boolean => {
    // Email validation with regex
    if (!formData.email) {
      setUiState(prev => ({ 
        ...prev, 
        error: { field: 'email', message: 'Email is required' } 
      }));
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setUiState(prev => ({ 
        ...prev, 
        error: { field: 'email', message: 'Please enter a valid email address' }
      }));
      return false;
    }
    
    if (!formData.password) {
      setUiState(prev => ({ 
        ...prev, 
        error: { field: 'password', message: 'Password is required' } 
      }));
      return false;
    }
    
    return true;
  }, [formData]);
  
  /**
   * Convert Supabase error messages to user-friendly messages
   */
  const mapSupabaseErrorToUserMessage = (errorMessage: string): string => {
    if (errorMessage.includes('Invalid login credentials')) {
      return 'The email or password you entered is incorrect. Please try again.';
    }
    
    if (errorMessage.includes('Email not confirmed')) {
      return 'Please verify your email address before logging in.';
    }
    
    if (errorMessage.includes('rate limit')) {
      return 'Too many login attempts. Please try again later.';
    }
    
    // Default fallback message
    return 'An error occurred during login. Please try again.';
  };
  
  /**
   * Handle form submission for email/password login with improved feedback
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset feedback state
    setUiState(prev => ({ 
      ...prev, 
      error: null, 
      feedbackMessage: null,
      feedbackType: null 
    }));
    
    if (!validateForm()) return;
    
    try {
      setUiState(prev => ({ 
        ...prev, 
        isLoading: true,
        feedbackMessage: 'Signing in...',
        feedbackType: 'info'
      }));
      
      await signIn(formData.email, formData.password);
      
      setUiState(prev => ({ 
        ...prev,
        feedbackMessage: 'Login successful, redirecting...',
        feedbackType: 'success'
      }));
      
      if (onSuccess) onSuccess();
      router.push(redirectUrl);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Login failed');
      
      // Map error message to user-friendly version
      const userMessage = mapSupabaseErrorToUserMessage(error.message);
      
      setUiState(prev => ({ 
        ...prev, 
        error: { field: 'general', message: userMessage },
        feedbackMessage: userMessage,
        feedbackType: 'error'
      }));
      
      if (onError) onError(error);
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  /**
   * Handle social login with specified provider
   */
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    // Reset feedback state
    setUiState(prev => ({ 
      ...prev, 
      error: null,
      feedbackMessage: `Connecting to ${provider}...`,
      feedbackType: 'info'
    }));
    
    try {
      setUiState(prev => ({ ...prev, isLoading: true }));
      await signInWithProvider(provider);
      // The redirect happens automatically as part of the OAuth flow
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`${provider} login failed`);
      
      setUiState(prev => ({ 
        ...prev, 
        error: { field: 'general', message: error.message },
        feedbackMessage: `Failed to connect to ${provider}. Please try again.`,
        feedbackType: 'error'
      }));
      
      if (onError) onError(error);
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
    // No finally block here since the page will redirect away on success
  };
  
  return {
    formData,
    uiState,
    updateField,
    handleSubmit,
    handleSocialLogin
  };
}