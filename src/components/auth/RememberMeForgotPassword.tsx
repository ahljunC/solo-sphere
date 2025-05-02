import React from 'react';
import { RememberMeCheckbox } from './RememberMeCheckbox';
import { ForgotPasswordLink } from './ForgotPasswordLink';

interface RememberMeForgotPasswordProps {
  /**
   * Whether the inputs are disabled
   */
  isDisabled?: boolean;
}

/**
 * RememberMeForgotPassword component
 * 
 * A combined component displaying the "Remember me" checkbox and
 * "Forgot password" link in a flex layout.
 */
export const RememberMeForgotPassword: React.FC<RememberMeForgotPasswordProps> = ({
  isDisabled
}) => {
  return (
    <div className="flex items-center justify-between mt-4 mb-6">
      <RememberMeCheckbox disabled={isDisabled} />
      <ForgotPasswordLink disabled={isDisabled} />
    </div>
  );
};