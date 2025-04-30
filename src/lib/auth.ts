import { supabase } from "./supabase"

export async function getUser() {
  const { data: user } = await supabase.auth.getUser()
  return user
}

export async function refreshSession() {
  return supabase.auth.refreshSession()
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email)
}

export async function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({ email, password })
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function updatePassword(newPassword: string) {
  const { data: session } = await supabase.auth.getSession()
  if (!session?.session) {
    throw new Error("No active session found")
  }
  return supabase.auth.updateUser({ password: newPassword })
}