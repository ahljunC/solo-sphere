import React from 'react';
import { FormControl } from '../FormElements';
import { useForm } from './Form';

interface FieldProps {
  name: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  name,
  label,
  helperText,
  isRequired,
  children
}) => {
  // Type assertion to help TypeScript understand we can use string keys
  const { errors, touched } = useForm<Record<string, any>>();
  const error = touched[name] && errors[name] ? errors[name] : undefined;

  return (
    <FormControl
      id={name}
      label={label}
      helperText={helperText}
      error={error}
      isRequired={isRequired}
    >
      {children}
    </FormControl>
  );
};