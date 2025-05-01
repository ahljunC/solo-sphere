import React, { useRef, useEffect, memo, useCallback } from 'react';
import { useLoginForm } from '@/lib/hooks/useLoginForm';

import { 
  ErrorAlert, 
  FormDivider, 
  SignUpPrompt,
  EmailField,
  PasswordField,
  RememberMeForgotPassword,
  SubmitButton,
  SocialLoginSection
} from './';

/**
 * Props for the LoginForm component
 */
interface LoginFormProps {
  /**
   * Optional callback for successful login
   */
  onSuccess?: () => void;

  /**
   * Optional callback for login error
   */
  onError?: (error: Error) => void;

  /**
   * Optional redirection URL after successful login
   */
  redirectUrl?: string;
}

/**
 * LoginForm component
 * 
 * Handles user authentication with email/password login
 * and social authentication options.
 * 
 * Features:
 * - Email and password validation
 * - Error handling and display
 * - Loading states during authentication
 * - Social login options
 * - "Remember me" functionality
 * - Forgot password link
 * 
 * Accessibility:
 * - Proper focus management 
 * - ARIA attributes for loading states
 * - Descriptive error messaging
 */
export const LoginForm: React.FC<LoginFormProps> = memo(({
  onSuccess,
  onError,
  redirectUrl = '/dashboard'
}) => {
  // Get form state and handlers from hook
  const {
    formData,
    uiState,
    updateField,
    handleSubmit,
    handleSocialLogin
  } = useLoginForm(redirectUrl, onSuccess, onError);
  
  // Create refs for focus management
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  
  // Focus the field with error after submission
  useEffect(() => {
    if (uiState.error) {
      if (uiState.error.field === 'email' && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (uiState.error.field === 'password' && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }
  }, [uiState.error]);
  
  // Memoized callbacks for field updates
  const handleEmailChange = useCallback((value: string) => {
    updateField('email', value);
  }, [updateField]);
  
  const handlePasswordChange = useCallback((value: string) => {
    updateField('password', value);
  }, [updateField]);
  
  const handleRememberMeChange = useCallback((checked: boolean) => {
    updateField('rememberMe', checked);
  }, [updateField]);
  
  // Memoized callbacks for social login
  const handleGoogleLogin = useCallback(() => {
    handleSocialLogin('google');
  }, [handleSocialLogin]);
  
  const handleFacebookLogin = useCallback(() => {
    handleSocialLogin('facebook');
  }, [handleSocialLogin]);
  
  return (
    <div className="w-full">
      <ErrorAlert 
        message={uiState.error?.message} 
        role="alert"
        aria-live="assertive"
      />
      
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6" 
        noValidate
        aria-describedby={uiState.error ? "login-form-error" : undefined}
        aria-live="polite"
      >
        <EmailField 
          ref={emailInputRef}
          value={formData.email}
          onChange={handleEmailChange}
          error={uiState.error?.field === 'email' ? uiState.error.message : undefined}
          isDisabled={uiState.isLoading}
        />
        
        <PasswordField 
          ref={passwordInputRef}
          value={formData.password}
          onChange={handlePasswordChange}
          error={uiState.error?.field === 'password' ? uiState.error.message : undefined}
          isDisabled={uiState.isLoading}
        />
        
        <RememberMeForgotPassword 
          rememberMe={formData.rememberMe}
          onRememberMeChange={handleRememberMeChange}
          isDisabled={uiState.isLoading}
        />
        
        <SubmitButton 
          isLoading={uiState.isLoading} 
        />
      </form>
      
      <FormDivider text="Or continue with" />
      
      <SocialLoginSection 
        onGoogleLogin={handleGoogleLogin}
        onFacebookLogin={handleFacebookLogin}
        isDisabled={uiState.isLoading}
      />
      
      <SignUpPrompt />
    </div>
  );
});

LoginForm.displayName = 'LoginForm';