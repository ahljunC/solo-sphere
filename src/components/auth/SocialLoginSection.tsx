import React from 'react';
import { SocialButton } from './SocialButton';

interface SocialLoginSectionProps {
  /**
   * Handler for Google login
   */
  onGoogleLogin: () => void;
  
  /**
   * Handler for Facebook login
   */
  onFacebookLogin: () => void;
  
  /**
   * Whether the buttons should be disabled
   */
  isDisabled?: boolean;
}

/**
 * SocialLoginSection component
 * 
 * Displays social login buttons in a consistent layout.
 * Handles accessibility and loading states for social authentication options.
 */
export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onGoogleLogin,
  onFacebookLogin,
  isDisabled = false
}) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          provider="google"
          onClick={onGoogleLogin}
          disabled={isDisabled}
          aria-label="Sign in with Google"
        />
        <SocialButton
          provider="facebook"
          onClick={onFacebookLogin}
          disabled={isDisabled}
          aria-label="Sign in with Facebook"
        />
      </div>
    </div>
  );
};