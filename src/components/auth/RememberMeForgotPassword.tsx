import React from 'react';
import Link from 'next/link';
import { CheckboxControl } from '../ui/FormElements';

interface RememberMeForgotPasswordProps {
  /**
   * Current value of the remember me checkbox
   */
  rememberMe: boolean;
  
  /**
   * Callback when remember me value changes
   */
  onRememberMeChange: (checked: boolean) => void;
  
  /**
   * Whether the checkbox is disabled
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
      <CheckboxControl
        id="remember-me"
        label="Remember me"
        checked={rememberMe}
        onChange={(e) => onRememberMeChange(e.target.checked)}
        disabled={isDisabled}
      />
      
      <div className="text-sm">
        <Link 
          href="/auth/forgot-password" 
          className="text-primary hover:text-primary-dark focus:outline-none focus:underline"
          aria-label="Forgot your password"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};