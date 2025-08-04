import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fskxcoiqamoxhmosfpqb.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZza3hjb2lxYW1veGhtb3NmcHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDEyOTcsImV4cCI6MjA2OTg3NzI5N30.-TNtcBgYN0QqtlQoEh2gffCRjEaHQonUOa_T09ZEux4'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined
    }
  })
  
  if (error) {
    console.error('Signup error:', error);
    throw error;
  }
  
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}
