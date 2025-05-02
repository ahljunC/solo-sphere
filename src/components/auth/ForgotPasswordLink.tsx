import React from 'react';
import Link from 'next/link';

interface ForgotPasswordLinkProps {
  /**
   * The URL to navigate to when clicked
   */
  href?: string;
  
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  
  /**
   * CSS class names
   */
  className?: string;
}

/**
 * ForgotPasswordLink component
 * 
 * A link to the forgot password page with consistent styling.
 */
export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  href = '/auth/forgot-password',
  disabled,
  className
}) => {
  const classes = `text-sm text-blue-600 hover:text-blue-800 font-medium ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className || ''}`;
  
  return (
    <Link 
      href={href}
      className={classes}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    >
      Forgot password?
    </Link>
  );
};