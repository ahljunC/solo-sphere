import React, { forwardRef } from 'react';
import { PasswordField as BasePasswordField } from '@/components/ui/Form';

interface PasswordFieldProps {
  /**
   * Current password value
   */
  value?: string;
  
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Error message
   */
  error?: string;
  
  /**
   * Whether the field is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the field is required
   */
  isRequired?: boolean;
  
  /**
   * Auto-complete attribute
   */
  autoComplete?: string;
}

/**
 * PasswordField component
 * 
 * A specialized text field for password input with consistent styling,
 * toggle visibility, and accessibility features.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(({
  value,
  onChange,
  error,
  isDisabled,
  placeholder = "••••••••",
  isRequired = true,
  autoComplete = "current-password"
}, ref) => {
  return (
    <BasePasswordField
      name="password"
      label="Password"
      placeholder={placeholder}
      autoComplete={autoComplete}
      isRequired={isRequired}
      disabled={isDisabled}
      helperText={error}
    />
  );
});

PasswordField.displayName = 'PasswordField';