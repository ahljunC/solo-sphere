import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth';

/**
 * Login form state interface
 */
interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * UI state interface for managing loading and error states
 */
interface UIState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for managing login form state and logic
 * 
 * This hook encapsulates all the state management and business logic
 * related to the login form, providing a clean separation between
 * the UI components and the application logic.
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
  
  // UI state
  const [uiState, setUiState] = useState<UIState>({
    isLoading: false,
    error: null
  });
  
  /**
   * Update a single form field
   */
  const updateField = (field: keyof LoginFormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    if (!formData.email) {
      setUiState(prev => ({ ...prev, error: 'Email is required' }));
      return false;
    }
    
    if (!formData.password) {
      setUiState(prev => ({ ...prev, error: 'Password is required' }));
      return false;
    }
    
    return true;
  };
  
  /**
   * Handle form submission for email/password login
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiState(prev => ({ ...prev, error: null }));
    
    if (!validateForm()) return;
    
    try {
      setUiState(prev => ({ ...prev, isLoading: true }));
      await signIn(formData.email, formData.password);
      if (onSuccess) onSuccess();
      router.push(redirectUrl);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Login failed');
      setUiState(prev => ({ ...prev, error: error.message }));
      if (onError) onError(error);
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  /**
   * Handle social login with specified provider
   * 
   * Note: This function initiates the OAuth flow, which will redirect
   * the user to the provider's authentication page. The redirect to
   * the dashboard happens automatically after successful OAuth callback.
   */
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setUiState(prev => ({ ...prev, error: null }));
    
    try {
      setUiState(prev => ({ ...prev, isLoading: true }));
      await signInWithProvider(provider);
      // The redirect happens automatically as part of the OAuth flow
      // The onSuccess callback and redirect don't run here because
      // the OAuth flow redirects the user away from the app
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Social login failed');
      setUiState(prev => ({ ...prev, error: error.message }));
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