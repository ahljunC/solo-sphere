import React from 'react';
import { Button } from '../ui/Button';

interface SubmitButtonProps {
  /**
   * Whether the form is currently submitting
   */
  isLoading: boolean;
  
  /**
   * Button text when not loading (defaults to "Log in")
   */
  text?: string;
  
  /**
   * Button text when loading (defaults to "Logging in...")
   */
  loadingText?: string;
}

/**
 * SubmitButton component for auth forms
 * 
 * A specialized Button component configured for form submission
 * with appropriate loading states and visual styling.
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  text = "Log in",
  loadingText = "Logging in..."
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      isLoading={isLoading}
      loadingText={loadingText}
      disabled={isLoading}
      className="py-2.5" // Slightly taller button for better touch targets
      aria-busy={isLoading}
    >
      {text}
    </Button>
  );
};