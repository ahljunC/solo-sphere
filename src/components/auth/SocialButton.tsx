import React from 'react';
import { GoogleIcon, FacebookIcon } from '@/components/ui/icons/social';

interface SocialButtonProps {
  /**
   * Social provider identifier
   */
  provider: 'google' | 'facebook';
  
  /**
   * Click handler
   */
  onClick: () => void;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Social authentication button component
 * 
 * Renders a consistently styled button for social authentication
 * with the appropriate icon and behavior for each provider.
 */
export const SocialButton: React.FC<SocialButtonProps> = ({ 
  provider, 
  onClick, 
  disabled,
  className = ''
}) => {
  // Provider-specific icon components
  const icons = {
    google: <GoogleIcon />,
    facebook: <FacebookIcon />
  };

  // Provider display names for screen readers
  const providerNames = {
    google: 'Google',
    facebook: 'Facebook'
  };

  return (
    <button
      type="button"
      className={`inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Sign in with ${providerNames[provider]}`}
    >
      <span className="sr-only">Sign in with {providerNames[provider]}</span>
      {icons[provider]}
    </button>
  );
};