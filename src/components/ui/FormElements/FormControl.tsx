import React from 'react';

/**
 * Props interface for the FormControl component
 */
export interface FormControlProps {
  /**
   * ID for the form element to connect label and input
   */
  id: string;
  
  /**
   * Label text to display
   */
  label?: string;
  
  /**
   * Help text to provide additional guidance
   */
  helperText?: string;
  
  /**
   * Error message to display when validation fails
   */
  error?: string;
  
  /**
   * Whether the form control is disabled
   */
  isDisabled?: boolean;
  
  /**
   * Whether the form control is required
   */
  isRequired?: boolean;
  
  /**
   * Child elements (usually an input, select, or textarea)
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FormControl component
 * 
 * Provides a consistent wrapper for form elements with support for:
 * - Labels
 * - Helper text
 * - Error messages
 * - Required state
 * - Disabled state
 * 
 * This component handles proper accessibility attributes and styling
 * for form elements according to the design system.
 */
export const FormControl: React.FC<FormControlProps> = ({
  id,
  label,
  helperText,
  error,
  isDisabled = false,
  isRequired = false,
  children,
  className = '',
}) => {
  // Generate a unique ID for the helper text and error message
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  
  // Determine which description ID to use for aria-describedby
  const descriptionId = error ? errorId : helperText ? helperId : undefined;
  
  return (
    <div className={`form-control ${className}`}>
      {label && (
        <label 
          htmlFor={id}
          className={`
            block mb-2 text-sm font-medium 
            ${error ? 'text-error' : 'text-gray-700'}
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {label}
          {isRequired && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      {/* Render the children directly - form elements should accept these props */}
      <div className={error ? 'has-error' : ''}>
        {children}
      </div>
      
      {/* Helper text */}
      {helperText && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};