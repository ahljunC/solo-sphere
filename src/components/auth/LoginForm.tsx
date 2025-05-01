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
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (values: LoginValues) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      await signIn(values.email, values.password);
      if (onSuccess) onSuccess();
      router.push(redirectUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      if (onError) onError(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setError(null);
    
    try {
      await signInWithProvider(provider);
      // The OAuth flow will redirect the user away from the app
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `${provider} login failed`;
      setError(errorMessage);
      if (onError) onError(err instanceof Error ? err : new Error(errorMessage));
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