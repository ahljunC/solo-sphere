import React, { useState, forwardRef } from 'react';
import { Field } from './Field';
import { Input } from '../FormElements';
import { useForm } from './Form';
import { BaseFieldProps } from './TextField';
import { PasswordToggle } from '../PasswordToggle';

interface PasswordFieldProps extends BaseFieldProps {
  /**
   * Input type
   */
  type?: 'password' | 'text';
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * HTML autocomplete attribute
   */
  autoComplete?: string;
  
  /**
   * Field value (for controlled usage)
   */
  value?: string;
  
  /**
   * Change handler (for controlled usage)
   */
  onChange?: (value: string) => void;
  
  /**
   * Blur handler (for controlled usage)
   */
  onBlur?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * PasswordField component
 *
 * A password input field with visibility toggle functionality.
 * Can be used either as a controlled component by providing value/onChange,
 * or as an uncontrolled component within a Form context.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({
    name,
    label,
    placeholder = "••••••••",
    helperText,
    required,
    autoComplete = "current-password",
    disabled,
    value,
    onChange,
    onBlur,
    className
  }, ref) => {
    // Use form context only if controlled props aren't provided
    const form = useForm<Record<string, unknown>>();
    const [showPassword, setShowPassword] = useState(false);
    
    // Handle changes with support for both controlled and uncontrolled modes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(newValue);
      } else {
        form.handleChange(name, newValue);
      }
    };
    
    // Handle blur with support for both controlled and uncontrolled modes
    const handleBlur = () => {
      if (onBlur) {
        onBlur();
      } else {
        form.handleBlur(name);
      }
    };
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
    };
    
    return (
      <Field
        name={name}
        label={label}
        helperText={helperText}
        required={required}
      >
        <div className="relative">
          <Input
            ref={ref}
            id={name}
            type={showPassword ? "text" : "password"}
            value={value !== undefined ? value : (form.values[name] as string) || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled || form.isSubmitting}
            className={`pr-10 ${className || ''}`} // Add padding for the toggle button
          />
          <PasswordToggle 
            isVisible={showPassword} 
            onToggle={togglePasswordVisibility} 
          />
        </div>
      </Field>
    );
  }
);

PasswordField.displayName = 'PasswordField';