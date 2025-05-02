import React from 'react';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

interface SubmitButtonProps {
  /**
   * Whether the form is currently submitting
   */
  isLoading?: boolean;
  
  /**
   * Text to display on the button
   */
  text?: string;
  
  /**
   * Text to display when loading
   */
  loadingText?: string;
}

/**
 * SubmitButton component
 * 
 * A consistent button used for form submission with loading state handling.
 * Includes accessibility attributes for loading state.
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  text = 'Log in',
  loadingText = 'Logging in...'
}) => {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading}
      aria-busy={isLoading}
      aria-disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader size="sm" className="mr-2" />
          {loadingText}
        </span>
      ) : (
        text
      )}
    </Button>
  );
};