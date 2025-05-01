import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { createFormValidator, validators, composeValidators } from '@/utils/validation';

/**
 * Interface for login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Interface for login form error
 */
interface LoginFormError {
  field?: keyof LoginFormData;
  message: string;
}

/**
 * Interface for UI state
 */
interface UIState {
  isLoading: boolean;
  error: LoginFormError | null;
}

/**
 * Hook for managing login form state and submission
 */
export const useLoginForm = (
  redirectUrl = '/dashboard',
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const router = useRouter();
  const { signIn, signInWithProvider } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state
  const [uiState, setUiState] = useState<UIState>({
    isLoading: false,
    error: null
  });

  /**
   * Form validation
   */
  const validateForm = createFormValidator<LoginFormData>({
    email: composeValidators(
      validators.required,
      validators.email
    ),
    password: validators.required,
    rememberMe: () => undefined // No validation needed for checkbox
  });
  
  /**
   * Update field value
   */
  const updateField = useCallback((field: keyof LoginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (uiState.error?.field === field) {
      setUiState(prev => ({ ...prev, error: null }));
    }
  }, [uiState.error]);
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    // Prevent default form submission if event is provided
    if (e) e.preventDefault();
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      // Get the first error
      const field = Object.keys(errors)[0] as keyof LoginFormData;
      setUiState({
        isLoading: false,
        error: {
          field,
          message: errors[field] as string
        }
      });
      return;
    }
    
    // Start loading
    setUiState({
      isLoading: true,
      error: null
    });
    
    try {
      // Attempt to sign in with Supabase
      await signIn(formData.email, formData.password);
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
      
      // Redirect on success
      router.push(redirectUrl);
    } catch (error) {
      // Format error message
      let errorMessage = 'An error occurred during login. Please try again.';
      let errorField: keyof LoginFormData | undefined = undefined;
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Try to determine which field has the error
        if (errorMessage.toLowerCase().includes('email')) {
          errorField = 'email';
        } else if (errorMessage.toLowerCase().includes('password')) {
          errorField = 'password';
        }
      }
      
      // Set error state
      setUiState({
        isLoading: false,
        error: {
          field: errorField,
          message: errorMessage
        }
      });
      
      // Call error callback if provided
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [formData, validateForm, signIn, onSuccess, onError, router, redirectUrl]);
  
  /**
   * Handle social login
   */
  const handleSocialLogin = useCallback(async (provider: 'google' | 'facebook') => {
    setUiState({
      isLoading: true,
      error: null
    });
    
    try {
      await signInWithProvider(provider);
      // The page will redirect, so no need to update state further
    } catch (error) {
      setUiState({
        isLoading: false,
        error: {
          message: error instanceof Error 
            ? error.message 
            : `Failed to sign in with ${provider}`
        }
      });
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [signInWithProvider, onError]);
  
  return {
    formData,
    uiState,
    updateField,
    handleSubmit,
    handleSocialLogin,
    validateForm
  };
};