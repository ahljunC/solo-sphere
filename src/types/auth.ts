/**
 * Centralized type definitions for authentication system
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

export type AuthProvider = 'google' | 'facebook' | 'github' | 'twitter';

export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ValidationError {
  field: keyof LoginFormState | 'general';
  message: string;
}

export interface UIState {
  isLoading: boolean;
  error: ValidationError | null;
  feedbackMessage?: string | null;
  feedbackType?: 'success' | 'info' | 'warning' | 'error' | null;
}