import React, { useState, forwardRef } from 'react';
import { Field } from './Field';
import { Input } from '../FormElements';
import { useForm } from './Form';
import { BaseFieldProps } from './TextField';

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
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1} // Don't include in tab order
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </Field>
    );
  }
);

PasswordField.displayName = 'PasswordField';

// Icon components
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
    />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
    />
  </svg>
);