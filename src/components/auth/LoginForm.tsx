import React, { useRef, memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, PasswordField } from '@/components/ui/Form';
import { AuthForm } from './AuthForm';
import { FormDivider } from './FormDivider';
import { SignUpPrompt } from './SignUpPrompt';
import { RememberMeForgotPassword } from './RememberMeForgotPassword'; 
import { SubmitButton } from './SubmitButton';
import { SocialLoginSection } from './SocialLoginSection';
import { useAuth } from '@/lib/auth';

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

// Extend Record<string, unknown> to ensure compatibility with Form component
interface LoginValues extends Record<string, unknown> {
  email: string;
  password: string;
  rememberMe: boolean;
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
  const router = useRouter();
  const { signIn, signInWithProvider } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create refs for focus management
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  
  const initialValues: LoginValues = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  const validate = (values: LoginValues) => {
    const errors: Partial<Record<keyof LoginValues, string>> = {};
    
    // Email validation with sequential checks instead of nesting
    if (!values.email) {
      errors.email = 'Email is required';
    }
    
    // Only check email format if email exists
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (values: LoginValues) => {
    // Reset state at the beginning
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Attempt sign in
      await signIn(values.email, values.password);
      
      // Handle success case
      if (onSuccess) {
        onSuccess();
      }
      
      // Navigate to destination on success
      router.push(redirectUrl);
    } catch (err) {
      // Format error consistently
      const errorInstance = err instanceof Error ?
        err :
        new Error('Login failed');
      
      // Set user-facing error message
      setError(errorInstance.message);
      
      // Call error handler if provided
      if (onError) {
        onError(errorInstance);
      }
    } finally {
      // Always reset submission state
      setIsSubmitting(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    // Reset error state at the beginning
    setError(null);
    
    try {
      // Attempt provider sign in
      await signInWithProvider(provider);
      // The OAuth flow will redirect the user away from the app
    } catch (err) {
      // Format error consistently
      const errorInstance = err instanceof Error ?
        err :
        new Error(`${provider} login failed`);
      
      // Set user-facing error message
      setError(errorInstance.message);
      
      // Call error handler if provided
      if (onError) {
        onError(errorInstance);
      }
    }
  };
  
  return (
    <div className="w-full">
      <AuthForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
        submitError={error}
      >
        <TextField
          ref={emailInputRef}
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />
        
        <PasswordField
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          disabled={isSubmitting}
        />
        
        <RememberMeForgotPassword isDisabled={isSubmitting} />
        
        <SubmitButton
          isLoading={isSubmitting}
          text="Log in"
          loadingText="Logging in..."
        />
      </AuthForm>
      
      <FormDivider text="Or continue with" />
      
      <SocialLoginSection 
        onGoogleLogin={() => handleSocialLogin('google')}
        onFacebookLogin={() => handleSocialLogin('facebook')}
        isDisabled={isSubmitting}
      />
      
      <SignUpPrompt />
    </div>
  );
});
LoginForm.displayName = 'LoginForm';