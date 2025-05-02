import React from 'react';

interface ErrorAlertProps {
  /**
   * Error message to display
   */
  message?: string | null;
  
  /**
   * ARIA role for the alert element
   */
  role?: string;
  
  /**
   * ARIA live region behavior
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Error alert component for form validation errors
 * 
 * Displays error messages in a consistent, user-friendly format
 * with appropriate styling and accessibility attributes.
 * 
 * Accessibility:
 * - Uses role="alert" by default
 * - Uses aria-live="assertive" to announce the error to screen readers
 * - Includes an ID for reference by other elements
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message, 
  role = 'alert', 
  'aria-live': ariaLive = 'assertive' 
}) => {
  if (!message) return null;
  
  return (
    <div 
      className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm"
      role={role}
      aria-live={ariaLive}
      id="login-form-error"
    >
      <div className="flex items-center">
        <svg 
          className="w-5 h-5 mr-2 text-error" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>
        {message}
      </div>
    </div>
  );
};