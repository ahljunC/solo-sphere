import React from 'react';

interface FormErrorProps {
  /**
   * The error message to display
   */
  error?: string | null;
  
  /**
   * CSS class names
   */
  className?: string;
  
  /**
   * The role of the error message (for accessibility)
   */
  role?: string;
  
  /**
   * Whether to hide the error visually but keep it accessible to screen readers
   */
  visuallyHidden?: boolean;
}

/**
 * FormError component
 * 
 * Displays a form-level error message with proper styling and accessibility attributes.
 * Only renders when an error is present.
 */
export const FormError: React.FC<FormErrorProps> = ({
  error,
  className = '',
  role = 'alert',
  visuallyHidden = false
}) => {
  if (!error) {
    return null;
  }
  
  const visuallyHiddenClass = visuallyHidden 
    ? 'sr-only' 
    : '';
  
  return (
    <div
      role={role}
      aria-live="assertive"
      className={`text-red-600 text-sm font-medium mt-1 ${visuallyHiddenClass} ${className}`}
    >
      {error}
    </div>
  );
};