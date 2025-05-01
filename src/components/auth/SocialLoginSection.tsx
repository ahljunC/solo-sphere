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
 * Groups social login buttons in a responsive grid layout
 * with consistent styling and spacing.
 */
export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({ 
  onGoogleLogin, 
  onFacebookLogin, 
  isDisabled 
}) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SocialButton
          provider="google"
          onClick={onGoogleLogin}
          disabled={isDisabled}
          className="h-12 text-base sm:h-10 sm:text-sm" // Larger touch targets on mobile
        />
        
        <SocialButton
          provider="facebook"
          onClick={onFacebookLogin}
          disabled={isDisabled}
          className="h-12 text-base sm:h-10 sm:text-sm" // Larger touch targets on mobile
        />
      </div>
    </>
  );
};