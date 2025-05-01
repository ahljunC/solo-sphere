import React from 'react';

interface FormDividerProps {
  /**
   * Text to display in the middle of the divider
   */
  text: string;
}

/**
 * Form divider component with centered text
 * 
 * Creates a visual divider with text centered on a horizontal line,
 * commonly used to separate different authentication methods.
 */
export const FormDivider: React.FC<FormDividerProps> = ({ text }) => (
  <div className="mt-6 relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-2 text-gray-500">{text}</span>
    </div>
  </div>
);