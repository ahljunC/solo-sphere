import React from 'react';

interface CheckboxControlProps {
  /**
   * ID for the checkbox element 
   */
  id: string;
  
  /**
   * Label text
   */
  label: string;
  
  /**
   * Current checked state
   */
  checked: boolean;
  
  /**
   * Change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  
  /**
   * Helper text to provide additional context
   */
  helperText?: string;
  
  /**
   * Error message
   */
  error?: string;
}

/**
 * Checkbox form control component
 * 
 * Provides a consistent checkbox input with label that follows the
 * application's design system and accessibility patterns.
 */
export const CheckboxControl: React.FC<CheckboxControlProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  helperText,
  error
}) => {
  // Generate IDs for helper text and error message
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  
  // Determine which description to use for aria-describedby
  const descriptionId = error ? errorId : helperText ? helperId : undefined;
  
  return (
    <div className="checkbox-control">
      <div className="flex items-center">
        <input
          id={id}
          name={id}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-300 
            text-primary focus:ring-primary
            ${error ? 'border-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-describedby={descriptionId}
          aria-invalid={error ? 'true' : undefined}
        />
        <label 
          htmlFor={id} 
          className={`
            ml-2 block text-sm 
            ${error ? 'text-error' : 'text-gray-700'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {label}
        </label>
      </div>
      
      {/* Helper text */}
      {helperText && !error && (
        <p id={helperId} className="mt-1 ml-6 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 ml-6 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};