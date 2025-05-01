import { AuthError } from '@supabase/supabase-js';

/**
 * Error types for authentication
 */
export enum AuthErrorType {
  INVALID_CREDENTIALS = 'invalid_credentials',
  EMAIL_NOT_CONFIRMED = 'email_not_confirmed',
  RATE_LIMITED = 'rate_limited',
  NETWORK_ERROR = 'network_error',
  GENERIC_ERROR = 'generic_error'
}

/**
 * Parsed authentication error
 */
export interface ParsedAuthError {
  type: AuthErrorType;
  message: string;
}

/**
 * Default error messages for authentication
 */
export const AUTH_ERROR_MESSAGES = {
  [AuthErrorType.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AuthErrorType.EMAIL_NOT_CONFIRMED]: 'Please confirm your email address before logging in',
  [AuthErrorType.RATE_LIMITED]: 'Too many attempts. Please try again later',
  [AuthErrorType.NETWORK_ERROR]: 'Network error. Please check your connection',
  [AuthErrorType.GENERIC_ERROR]: 'Authentication failed. Please try again'
};

/**
 * Parses an authentication error from Supabase
 * 
 * @param error The error from Supabase auth operation
 * @returns A parsed error with type and user-friendly message
 */
export function parseAuthError(error: unknown): ParsedAuthError {
  // Handle Supabase AuthError
  if (error instanceof AuthError) {
    const { message, status } = error;
    
    // Check for specific error patterns
    if (message.includes('Invalid login credentials')) {
      return {
        type: AuthErrorType.INVALID_CREDENTIALS,
        message: AUTH_ERROR_MESSAGES[AuthErrorType.INVALID_CREDENTIALS]
      };
    }
    
    if (message.includes('Email not confirmed')) {
      return {
        type: AuthErrorType.EMAIL_NOT_CONFIRMED,
        message: AUTH_ERROR_MESSAGES[AuthErrorType.EMAIL_NOT_CONFIRMED]
      };
    }
    
    if (status === 429) {
      return {
        type: AuthErrorType.RATE_LIMITED,
        message: AUTH_ERROR_MESSAGES[AuthErrorType.RATE_LIMITED]
      };
    }
    
    // Generic auth error
    return {
      type: AuthErrorType.GENERIC_ERROR,
      message: message || AUTH_ERROR_MESSAGES[AuthErrorType.GENERIC_ERROR]
    };
  }
  
  // Handle network errors
  if (error instanceof Error && (
    error.message.includes('fetch') || 
    error.message.includes('network') ||
    error.message.includes('connection')
  )) {
    return {
      type: AuthErrorType.NETWORK_ERROR,
      message: AUTH_ERROR_MESSAGES[AuthErrorType.NETWORK_ERROR]
    };
  }
  
  // Handle other errors
  const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
  
  return {
    type: AuthErrorType.GENERIC_ERROR,
    message: errorMessage || AUTH_ERROR_MESSAGES[AuthErrorType.GENERIC_ERROR]
  };
}

/**
 * Formats a user-friendly error message for display
 * 
 * @param error The error object
 * @returns A user-friendly error message
 */
export function getAuthErrorMessage(error: unknown): string {
  const parsedError = parseAuthError(error);
  return parsedError.message;
}