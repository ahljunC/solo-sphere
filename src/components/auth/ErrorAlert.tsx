import React from 'react';

interface ErrorAlertProps {
  /**
   * Error message to display
   */
  message: string | null;
}

/**
 * Error alert component for form validation errors
 * 
 * Displays error messages in a consistent, user-friendly format
 * with appropriate styling and accessibility attributes.
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div 
      className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm"
      role="alert"
    >
      {message}
    </div>
  );
};