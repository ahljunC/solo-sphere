import React from 'react';
import { CheckboxField } from '@/components/ui/Form';

interface RememberMeCheckboxProps {
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
}

/**
 * RememberMeCheckbox component
 * 
 * A specialized checkbox for "Remember me" functionality in login forms.
 * Provides consistent styling and labeling.
 */
export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  disabled
}) => {
  return (
    <CheckboxField
      name="rememberMe"
      label="Remember me"
      disabled={disabled}
    />
  );
};