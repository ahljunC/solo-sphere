import React from 'react';
import Link from 'next/link';

interface SignUpPromptProps {
  /**
   * Optional URL for the sign-up page
   */
  signUpUrl?: string;
}

/**
 * Sign-up prompt component
 * 
 * Displays a consistent call-to-action for new users to sign up
 * for an account from the login page.
 */
export const SignUpPrompt: React.FC<SignUpPromptProps> = ({ 
  signUpUrl = '/auth/register' 
}) => (
  <div className="mt-6 text-center text-sm text-gray-600">
    <span>Don't have an account?</span>
    <Link 
      href={signUpUrl} 
      className="ml-1 font-medium text-primary hover:text-primary-dark"
    >
      Sign up now
    </Link>
  </div>
);