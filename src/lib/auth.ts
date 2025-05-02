import { supabase } from "./supabase";

// Re-export everything from AuthContext for hooks-based usage
export * from './contexts/auth/AuthContext';

// Direct utility functions for non-hook-based usage
export async function getUser() {
  const { data: user } = await supabase.auth.getUser();
  return user;
}

export async function refreshSession() {
  return supabase.auth.refreshSession();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
}

export async function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function updatePassword(newPassword: string) {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) {
    throw new Error("No active session found");
  }
  return supabase.auth.updateUser({ password: newPassword });
}