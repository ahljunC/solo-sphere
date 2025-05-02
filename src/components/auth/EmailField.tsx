import React, { forwardRef } from 'react';
import { TextField } from '@/components/ui/Form';

interface EmailFieldProps {
  /**
   * Current email value
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
}

/**
 * EmailField component
 * 
 * A specialized text field for email input with consistent styling,
 * validation, and accessibility features.
 */
export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(({
  value,
  onChange,
  error,
  disabled,
  placeholder = "your@email.com",
  required = true
}, ref) => {
  return (
    <TextField
      ref={ref}
      name="email"
      label="Email"
      type="email"
      placeholder={placeholder}
      autoComplete="email"
      required={required}
      disabled={disabled}
      helperText={error}
      value={value}
      onChange={onChange}
    />
  );
});

EmailField.displayName = 'EmailField';