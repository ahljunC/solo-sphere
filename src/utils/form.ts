import { FormEvent } from 'react';

/**
 * Prevents default form submission behavior
 * 
 * @param event The form event
 */
export function preventFormSubmit(event: FormEvent): void {
  event.preventDefault();
}

/**
 * Formats an error object into a user-friendly message
 * 
 * @param error The error object to format
 * @returns A user-friendly error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Determines if a form field has an error
 * 
 * @param touched Whether the field has been touched
 * @param error The field's error message, if any
 * @returns Whether the field has an error that should be displayed
 */
export function hasFieldError(touched: boolean, error?: string): boolean {
  return touched && !!error;
}

/**
 * Creates a form submission handler that prevents default form submission
 * 
 * @param handler The function to execute on form submission
 * @returns A function that can be used as a form's onSubmit handler
 */
export function createSubmitHandler<T>(
  handler: (values: T) => Promise<void> | void
): (event: FormEvent, values: T) => Promise<void> | void {
  return (event, values) => {
    preventFormSubmit(event);
    return handler(values);
  };
}

/**
 * Debounces a function call
 * 
 * @param fn The function to debounce
 * @param delay The debounce delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Creates a throttled function
 * 
 * @param fn The function to throttle
 * @param limit The throttle limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}