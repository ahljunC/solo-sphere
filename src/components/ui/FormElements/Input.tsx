import React from 'react';

/**
 * Input component variants
 */
type InputVariant = 'outline' | 'filled';

/**
 * Input component sizes
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props interface for the Input component
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual style variant
   * @default 'outline'
   */
  variant?: InputVariant;
  
  /**
   * Size variant
   * @default 'md'
   */
  inputSize?: InputSize;
  
  /**
   * Error state - shows red border when true
   */
  error?: boolean;
  
  /**
   * Content to display before the input field
   * (icon, text, etc.)
   */
  leftElement?: React.ReactNode;
  
  /**
   * Content to display after the input field
   * (icon, button, etc.)
   */
  rightElement?: React.ReactNode;
  
  /**
   * Label text - primarily for direct use without FormControl
   * For most cases, use this input within a FormControl
   */
  label?: string;
  
  /**
   * Additional wrapper class names
   */
  wrapperClassName?: string;
}

/**
 * Input component
 * 
 * A customizable input component that supports:
 * - Different visual variants (outline, filled)
 * - Different sizes
 * - Left and right elements (icons, buttons, etc.)
 * - Error states
 * - Full accessibility
 * 
 * Can be used standalone or within a FormControl component.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '',
    variant = 'outline',
    inputSize = 'md',
    error = false,
    leftElement,
    rightElement,
    label,
    wrapperClassName = '',
    disabled,
    ...props
  }, ref) => {
    // Get appropriate styles based on props
    const variantStyles = {
      outline: 'bg-white border border-gray-300 focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary',
      filled: 'bg-gray-100 border border-transparent focus:bg-white focus:border-primary',
    };
    
    const sizeStyles = {
      sm: 'h-9 text-sm',
      md: 'h-12 text-base',
      lg: 'h-14 text-lg',
    };
    
    const paddingWithElements = {
      left: leftElement ? 'pl-10' : '',
      right: rightElement ? 'pr-10' : '',
    };
    
    // Combine all the styles
    const inputStyles = `
      block w-full rounded-md transition-colors
      ${variantStyles[variant]}
      ${sizeStyles[inputSize]}
      ${paddingWithElements.left} ${paddingWithElements.right}
      ${error ? 'border-error focus:border-error focus:ring-error focus:ring-opacity-50' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
      ${className}
    `;
    
    // Common input element
    const inputElement = (
      <input
        ref={ref}
        className={inputStyles}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    );
    
    // If there are no left or right elements, just return the input
    if (!leftElement && !rightElement && !label) {
      return inputElement;
    }
    
    // Create container with left and/or right elements if needed
    return (
      <div className={`relative ${wrapperClassName}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        
        {leftElement && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftElement}
          </span>
        )}
        
        {inputElement}
        
        {rightElement && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightElement}
          </span>
        )}
      </div>
    );
  }
);

// Display name for debugging purposes
Input.displayName = 'Input';