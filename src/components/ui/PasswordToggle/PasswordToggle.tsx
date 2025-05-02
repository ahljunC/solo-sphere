import React from 'react';
import { EyeIcon } from '../icons/EyeIcon';
import { EyeOffIcon } from '../icons/EyeOffIcon';

interface PasswordToggleProps {
  /**
   * Whether the password is currently visible
   */
  isVisible: boolean;
  
  /**
   * Function to toggle password visibility
   */
  onToggle: () => void;
  
  /**
   * Optional CSS class names
   */
  className?: string;
}

/**
 * PasswordToggle component
 * 
 * A button that toggles password visibility in password fields.
 * Includes appropriate accessibility attributes and icons.
 */
export const PasswordToggle: React.FC<PasswordToggleProps> = ({
  isVisible,
  onToggle,
  className
}) => {
  return (
    <button
      type="button"
      className={`absolute inset-y-0 right-0 flex items-center pr-3 ${className || ''}`}
      onClick={onToggle}
      aria-label={isVisible ? "Hide password" : "Show password"}
      tabIndex={-1} // Don't include in tab order
    >
      {isVisible ? (
        <EyeOffIcon className="h-5 w-5 text-gray-400" />
      ) : (
        <EyeIcon className="h-5 w-5 text-gray-400" />
      )}
    </button>
  );
};