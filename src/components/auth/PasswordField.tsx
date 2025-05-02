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
  disabled?: boolean;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
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
  disabled,
  placeholder = "••••••••",
  required = true,
  autoComplete = "current-password"
}, ref) => {
  return (
    <BasePasswordField
      ref={ref}
      name="password"
      label="Password"
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      helperText={error}
      value={value}
      onChange={onChange}
    />
  );
});

PasswordField.displayName = 'PasswordField';