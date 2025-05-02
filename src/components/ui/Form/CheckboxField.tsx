import React from 'react';
import { CheckboxControl } from '../FormElements';
import { useForm } from './Form';

interface CheckboxFieldProps {
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
   * Whether the field is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is checked (for controlled usage)
   */
  checked?: boolean;
  
  /**
   * Change handler (for controlled usage)
   */
  onChange?: (checked: boolean) => void;
}

/**
 * CheckboxField component
 *
 * A checkbox field with consistent styling and behavior.
 * Can be used either as a controlled component or within a Form context.
 */
export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  helperText,
  disabled,
  checked,
  onChange
}) => {
  const form = useForm<Record<string, unknown>>();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (onChange) {
      onChange(newChecked);
    } else {
      form.handleChange(name, newChecked);
    }
  };
  
  return (
    <CheckboxControl
      id={name}
      label={label}
      helperText={helperText}
      checked={checked !== undefined ? checked : !!form.values[name]}
      onChange={handleChange}
      disabled={disabled || form.isSubmitting}
    />
  );
};