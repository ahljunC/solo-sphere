/**
 * Collection of commonly used form field validators
 */
export const validators = {
  /**
   * Validates that a field has a value
   */
  required: (value: any) => 
    !value ? 'This field is required' : undefined,
    
  /**
   * Validates that a string is a proper email format
   */
  email: (value: string) => 
    !value ? undefined : 
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 
      'Please enter a valid email address' : undefined,
      
  /**
   * Validates that a string meets minimum length requirements
   */
  minLength: (min: number) => (value: string) => 
    !value ? undefined : 
    value.length < min ? 
      `Must be at least ${min} characters` : undefined,
      
  /**
   * Validates that a string doesn't exceed maximum length
   */
  maxLength: (max: number) => (value: string) => 
    !value ? undefined : 
    value.length > max ? 
      `Must be no more than ${max} characters` : undefined,
      
  /**
   * Validates that a password meets complexity requirements
   */
  password: (value: string) => {
    if (!value) return undefined;
    
    const errors = [];
    if (value.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(value)) errors.push('at least one uppercase letter');
    if (!/[a-z]/.test(value)) errors.push('at least one lowercase letter');
    if (!/[0-9]/.test(value)) errors.push('at least one number');
    
    return errors.length > 0 ? 
      `Password must contain ${errors.join(', ')}` : undefined;
  },
  
  /**
   * Validates that a field matches another field (e.g., password confirmation)
   */
  matchField: (fieldName: string, fieldLabel: string) => 
    (value: string, allValues: Record<string, any>) => 
      value !== allValues[fieldName] ? 
        `Must match ${fieldLabel}` : undefined
};

/**
 * Combines multiple validators into a single validator
 * 
 * @param validators Array of validator functions to compose
 * @returns A validator function that runs all validators in sequence
 */
export function composeValidators(...validators: ((value: any, allValues?: any) => string | undefined)[]) {
  return (value: any, allValues?: any) => {
    for (const validator of validators) {
      const error = validator(value, allValues);
      if (error) return error;
    }
    return undefined;
  };
}

/**
 * Transforms an object of validation functions into a validation object for a form
 * 
 * @param validatorMap Object mapping field names to validator functions
 * @returns A function that validates the entire form
 */
export function createFormValidator<T extends Record<string, any>>(
  validatorMap: Record<keyof T, (value: any, allValues?: any) => string | undefined>
) {
  return (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    for (const field in validatorMap) {
      const validator = validatorMap[field];
      const error = validator(values[field], values);
      
      if (error) {
        errors[field] = error;
      }
    }
    
    return errors;
  };
}