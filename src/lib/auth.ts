import { supabase } from "./supabase"

// User Registration
export async function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({ email, password })
}

// Email/Password Authentication
export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

// OAuth Authentication
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  })
}

export async function signInWithFacebook() {
  return supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  })
}

export async function signInWithLinkedIn() {
  return supabase.auth.signInWithOAuth({
    provider: 'linkedin',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  })
}

// Password Reset
export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({ password })
}

// Session Management
export async function getSession() {
  return supabase.auth.getSession()
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Sign Out
export async function signOut() {
  return supabase.auth.signOut()
}
