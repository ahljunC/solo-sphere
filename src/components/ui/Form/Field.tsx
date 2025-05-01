import React from 'react';
import { FormControl } from '../FormElements';
import { useForm } from './Form';

interface FieldProps {
  /**
   * Field name
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
   * Field children
   */
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  name,
  label,
  helperText,
  required,
  children
}) => {
  // Type assertion to help TypeScript understand we can use string keys
  const { errors, touched } = useForm<Record<string, unknown>>();
  const error = touched[name] && errors[name] ? errors[name] : undefined;

  return (
    <FormControl
      id={name}
      label={label}
      helperText={helperText}
      error={error}
      isRequired={required}
    >
      {children}
    </FormControl>
  );
};