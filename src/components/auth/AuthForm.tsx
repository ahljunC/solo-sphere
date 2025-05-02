import React from 'react';
import { Form, FormError } from '@/components/ui/Form';

interface AuthFormProps<T extends Record<string, unknown>> {
  /**
   * Initial form values
   */
  initialValues: T;
  
  /**
   * Form submission handler
   */
  onSubmit: (values: T) => Promise<void> | void;
  
  /**
   * Form validation function
   */
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  
  /**
   * Error message to display at the form level
   */
  submitError?: string | null;
  
  /**
   * Form children
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * AuthForm component
 * 
 * A specialized Form wrapper for authentication forms with
 * consistent layout, validation, and error handling.
 */
export function AuthForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validate,
  submitError,
  children,
  className
}: AuthFormProps<T>) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      className={`space-y-4 ${className || ''}`}
    >
      {submitError && (
        <FormError 
          error={submitError} 
          className="bg-red-50 border border-red-200 rounded-md p-3"
        />
      )}
      
      {children}
    </Form>
  );
}