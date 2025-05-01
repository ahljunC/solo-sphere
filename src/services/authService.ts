import {
  signUpWithEmail as supabaseSignUp,
  signInWithEmail as supabaseSignIn,
  signInWithGoogle as supabaseGoogleSignIn,
  signInWithFacebook as supabaseFacebookSignIn,
  signInWithLinkedIn as supabaseLinkedInSignIn,
  resetPassword as supabaseResetPassword,
  updatePassword as supabaseUpdatePassword,
  getSession as supabaseGetSession,
  getUser as supabaseGetUser,
  signOut as supabaseSignOut
} from '@/lib/auth'

export type AuthError = {
  message: string;
  code?: string;
}

export type AuthResult<T = any> = {
  data: T | null;
  error: AuthError | null;
}

// Wrapper to handle consistent error and response formats
async function handleAuthOperation<T>(
  operation: () => Promise<{ data: any; error: any }>
): Promise<AuthResult<T>> {
  try {
    const { data, error } = await operation()
    
    if (error) {
      return {
        data: null,
        error: {
          message: error.message || 'Authentication failed',
          code: error.code
        }
      }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('Auth operation failed:', err)
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      }
    }
  }
}

// User Registration
export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  return handleAuthOperation(() => supabaseSignUp(email, password))
}

// Email/Password Authentication
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  return handleAuthOperation(() => supabaseSignIn(email, password))
}

// OAuth Authentication
export async function signInWithProvider(
  provider: 'google' | 'facebook' | 'linkedin'
): Promise<AuthResult> {
  switch (provider) {
    case 'google':
      return handleAuthOperation(() => supabaseGoogleSignIn())
    case 'facebook':
      return handleAuthOperation(() => supabaseFacebookSignIn())
    case 'linkedin':
      return handleAuthOperation(() => supabaseLinkedInSignIn())
    default:
      return {
        data: null,
        error: { message: `Unsupported provider: ${provider}` }
      }
  }
}

// Password Reset
export async function resetPassword(email: string): Promise<AuthResult> {
  return handleAuthOperation(() => supabaseResetPassword(email))
}

export async function updatePassword(password: string): Promise<AuthResult> {
  return handleAuthOperation(() => supabaseUpdatePassword(password))
}

// Session Management
export async function getSession() {
  return handleAuthOperation(() => supabaseGetSession())
}

export async function getUser() {
  try {
    const user = await supabaseGetUser()
    return { data: user, error: null }
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Failed to get user'
      }
    }
  }
}

// Sign Out
export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabaseSignOut()
    
    if (error) {
      return {
        data: null,
        error: {
          message: error.message || 'Sign out failed',
          code: error.code
        }
      }
    }
    
    return { data: true, error: null }
  } catch (err) {
    console.error('Sign out failed:', err)
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : 'An unexpected error occurred during sign out'
      }
    }
  }
}