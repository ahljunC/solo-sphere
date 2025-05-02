import React from 'react';

/**
 * Size options for the Loader component
 */
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Color options for the Loader
 */
export type LoaderColor = 'primary' | 'light' | 'dark' | 'gray';

/**
 * Props interface for the Loader component
 */
export interface LoaderProps {
  /**
   * The size of the loader
   * @default 'md'
   */
  size?: LoaderSize;
  
  /**
   * The color of the loader
   * @default 'primary'
   */
  color?: LoaderColor;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Accessible label for the loader
   * @default 'Loading'
   */
  label?: string;
}

/**
 * Size to pixel mapping for the loader
 */
const sizeMap: Record<LoaderSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48
};

/**
 * Color to CSS variable mapping for the loader
 */
const colorMap: Record<LoaderColor, string> = {
  primary: 'var(--color-primary, #3B82F6)',
  light: '#FFFFFF',
  dark: '#333333',
  gray: '#9E9E9E'
};

/**
 * Loader component
 * 
 * Displays a spinning loader to indicate loading state.
 * It can be customized with different sizes and colors.
 */
export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  label = 'Loading'
}) => {
  const pixelSize = sizeMap[size];
  const colorValue = colorMap[color];
  
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize
      }}
      role="status"
      aria-label={label}
    >
      <svg
        className="animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={pixelSize}
        height={pixelSize}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={colorValue}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={colorValue}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

// Add display name for better debugging
Loader.displayName = 'Loader';