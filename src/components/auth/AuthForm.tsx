import React from 'react';
import { Form } from '@/components/ui/Form';
import { ErrorAlert } from './ErrorAlert';

interface AuthFormProps<T> {
  /**
   * Initial form values
   */
  initialValues: T;
  
  /**
   * Form submission handler
   */
  onSubmit: (values: T) => Promise<void>;
  
  /**
   * Form validation function
   */
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  
  /**
   * Error message to display
   */
  submitError?: string | null;
  
  /**
   * Form children components
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AuthForm component
 * 
 * A specialized form container for authentication forms that includes:
 * - Error handling and display
 * - Consistent styling
 * - Form state management
 * - Validation
 */
export function AuthForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  submitError,
  children,
  className = ''
}: AuthFormProps<T>) {
  return (
    <>
      {submitError && (
        <ErrorAlert 
          message={submitError} 
          role="alert"
          aria-live="assertive"
        />
      )}
      
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        className={`space-y-6 ${className}`}
      >
        {children}
      </Form>
    </>
  );
}