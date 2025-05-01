import React from 'react';
import { CheckboxControl } from '../FormElements';
import { useForm } from './Form';

interface CheckboxFieldProps {
  name: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  helperText,
  disabled
}) => {
  const { values, handleChange, isSubmitting } = useForm<Record<string, any>>();
  
  return (
    <CheckboxControl
      id={name}
      label={label}
      helperText={helperText}
      checked={!!values[name]}
      onChange={(e) => handleChange(name, e.target.checked)}
      disabled={disabled || isSubmitting}
    />
  );
};