import React, { forwardRef } from 'react';
import { Field } from './Field';
import { Input } from '../FormElements';
import { useForm } from './Form';

export interface BaseFieldProps {
  /**
   * Field name (used for form state)
   */
  name: string;
  
  /**
   * Field label
   */
  label: string;
  
  /**
   * Helper text displayed below the field
   */
  helperText?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
}

export interface TextFieldProps extends BaseFieldProps {
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
  
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
 * TextField component
 *
 * A text input field with consistent styling and behavior.
 * Can be used either as a controlled component by providing value/onChange,
 * or as an uncontrolled component within a Form context.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    name,
    label,
    type = 'text',
    placeholder,
    helperText,
    required,
    autoComplete,
    disabled,
    value,
    onChange,
    onBlur,
    className
  }, ref) => {
    // Use form context only if controlled props aren't provided
    const form = useForm<Record<string, unknown>>();
    
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
    
    return (
      <Field
        name={name}
        label={label}
        helperText={helperText}
        required={required}
      >
        <Input
          ref={ref}
          id={name}
          type={type}
          value={value !== undefined ? value : (form.values[name] as string) || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled || form.isSubmitting}
          className={className}
        />
      </Field>
    );
  }
);

TextField.displayName = 'TextField';