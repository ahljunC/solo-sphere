import React, { forwardRef } from 'react';
import { Field } from './Field';
import { Input } from '../FormElements';
import { useForm } from './Form';

interface TextFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, type = 'text', placeholder, helperText, isRequired, autoComplete, disabled }, ref) => {
    const { values, handleChange, handleBlur, isSubmitting } = useForm<Record<string, any>>();
    
    return (
      <Field
        name={name}
        label={label}
        helperText={helperText}
        isRequired={isRequired}
      >
        <Input
          ref={ref}
          id={name}
          type={type}
          value={values[name] || ''}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled || isSubmitting}
        />
      </Field>
    );
  }
);

TextField.displayName = 'TextField';