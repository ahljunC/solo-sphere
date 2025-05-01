import React, { forwardRef } from 'react';
import { FormControl, Input } from '../ui/FormElements';

interface EmailFieldProps {
  /**
   * Current email value
   */
  value: string;
  
  /**
   * Callback when email value changes
   */
  onChange: (value: string) => void;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the field is disabled
   */
  isDisabled?: boolean;
}

/**
 * EmailField component
 * 
 * A specialized input field for email addresses that includes:
 * - Proper labeling
 * - Appropriate input type
 * - Autocomplete functionality
 * - Accessibility attributes
 * - Error handling
 */
export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ value, onChange, error, isDisabled }, ref) => (
    <FormControl
      id="email"
      label="Email"
      error={error}
      isRequired
    >
      <Input
        ref={ref}
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="your@email.com"
        autoComplete="email"
        disabled={isDisabled}
        aria-invalid={!!error}
      />
    </FormControl>
  )
);

EmailField.displayName = 'EmailField';