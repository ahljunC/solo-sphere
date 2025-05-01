import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/Button';
import { FormControl, Input, CheckboxControl } from '../ui/FormElements';
import { useLoginForm } from '@/lib/hooks/useLoginForm';
import { 
  ErrorAlert, 
  FormDivider, 
  SocialButton, 
  SignUpPrompt 
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
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  redirectUrl = '/dashboard'
}) => {
  const {
    formData,
    uiState,
    updateField,
    handleSubmit,
    handleSocialLogin
  } = useLoginForm(redirectUrl, onSuccess, onError);
  
  return (
    <div className="w-full">
      <ErrorAlert message={uiState.error} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email field */}
        <FormControl
          id="email"
          label="Email"
          error={uiState.error && !formData.email ? 'Email is required' : undefined}
          isRequired
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            disabled={uiState.isLoading}
          />
        </FormControl>
        
        {/* Password field */}
        <FormControl
          id="password"
          label="Password"
          error={uiState.error && !formData.password ? 'Password is required' : undefined}
          isRequired
        >
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={uiState.isLoading}
          />
        </FormControl>
        
        {/* Remember me and Forgot password */}
        <div className="flex items-center justify-between">
          <CheckboxControl
            id="remember-me"
            label="Remember me"
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            disabled={uiState.isLoading}
          />
          
          <div className="text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark">
              Forgot your password?
            </Link>
          </div>
        </div>
        
        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          isLoading={uiState.isLoading}
          loadingText="Logging in..."
          disabled={uiState.isLoading}
        >
          Log in
        </Button>
      </form>
      
      <FormDivider text="Or continue with" />
      
      {/* Social login buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <SocialButton
          provider="google"
          onClick={() => handleSocialLogin('google')}
          disabled={uiState.isLoading}
        />
        
        <SocialButton
          provider="facebook"
          onClick={() => handleSocialLogin('facebook')}
          disabled={uiState.isLoading}
        />
      </div>
      
      <SignUpPrompt />
    </div>
  );
};