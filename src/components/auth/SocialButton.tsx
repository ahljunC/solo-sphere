import React from 'react';

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
  disabled 
}) => {
  // Provider-specific SVG icons
  const icons = {
    google: (
      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
    facebook: (
      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    )
  };

  // Provider display names for screen readers
  const providerNames = {
    google: 'Google',
    facebook: 'Facebook'
  };

  return (
    <button
      type="button"
      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Sign in with ${providerNames[provider]}`}
    >
      <span className="sr-only">Sign in with {providerNames[provider]}</span>
      {icons[provider]}
    </button>
  );
};