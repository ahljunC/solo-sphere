import React from 'react';
import Link from 'next/link';
import { CheckboxField } from '@/components/ui/Form';

interface RememberMeForgotPasswordProps {
  /**
   * Whether to remember the user login
   */
  rememberMe?: boolean;
  
  /**
   * Callback when remember me changes
   */
  onRememberMeChange?: (checked: boolean) => void;
  
  /**
   * Whether the component is in a disabled state
   */
  isDisabled?: boolean;
}

/**
 * RememberMeForgotPassword component
 * 
 * Displays the "Remember me" checkbox and "Forgot password" link
 * in a consistent layout with proper alignment and spacing.
 */
export const RememberMeForgotPassword: React.FC<RememberMeForgotPasswordProps> = ({
  rememberMe,
  onRememberMeChange,
  isDisabled
}) => {
  return (
    <div className="flex items-center justify-between">
      <CheckboxField
        name="rememberMe"
        label="Remember me"
        disabled={isDisabled}
      />
      
      <div className="text-sm">
        <Link 
          href="/auth/forgot-password" 
          className={`
            text-primary hover:text-primary-dark focus:outline-none focus:underline
            ${isDisabled ? 'pointer-events-none opacity-70' : ''}
          `}
          aria-label="Forgot your password"
          tabIndex={isDisabled ? -1 : undefined}
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};