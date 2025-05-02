import React from 'react';
import { cva, type VariantProps } from '../../../lib/utils/cva';
import { Loader } from '../Loader';

/**
 * Button component variants using our cva implementation
 * This allows for consistent styling with type-safe variants
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      // Visual variant styles
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/90 shadow-sm',
        secondary: 'bg-white text-primary border border-primary hover:bg-gray-100 active:bg-gray-200',
        text: 'bg-transparent text-primary hover:underline p-0 h-auto shadow-none',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
        danger: 'bg-error text-white hover:bg-error/90 active:bg-error/80'
      },
      // Size variants
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
      },
      // Full width variant
      fullWidth: {
        true: 'w-full',
      },
    },
    // Default variants when not specified
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: 'false',
    },
  }
);

/**
 * Button component props combining HTML button attributes and our variants
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Button visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'text' | 'ghost' | 'danger';
  
  /**
   * Button size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Text to display when button is loading
   */
  loadingText?: string;
  
  /**
   * Optional icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Optional icon to display after the button text
   */
  rightIcon?: React.ReactNode;
};

/**
 * Button component for user interactions
 * 
 * Implements the design system's button styles and behaviors including:
 * - Multiple visual variants (primary, secondary, text, ghost, danger)
 * - Different size options
 * - Loading states
 * - Icon support
 * - Full accessibility support
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    isLoading, 
    loadingText, 
    leftIcon, 
    rightIcon, 
    children, 
    ...props 
  }, ref) => {
    // Convert boolean to string for our simplified cva implementation
    const fullWidthValue = fullWidth ? 'true' : 'false';
    
    return (
      <button
        className={buttonVariants({ 
          variant, 
          size, 
          fullWidth: fullWidthValue, 
          className 
        })}
        ref={ref}
        disabled={isLoading || props.disabled}
        // Add data attributes to aid testing
        data-loading={isLoading ? true : undefined}
        {...props}
      >
        {isLoading && (
          <Loader 
            className="mr-2" 
            size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'} 
            color={variant === 'primary' || variant === 'danger' ? 'light' : 'primary'} 
          />
        )}
        
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        
        {isLoading && loadingText ? loadingText : children}
        
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

// Display name for debugging purposes
Button.displayName = 'Button';