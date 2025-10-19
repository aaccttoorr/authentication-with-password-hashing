import {API_KEY, PROJECT_URL} from "../../constants/supabase.js";
const { createClient } = window.supabase

export class SupabaseService {
  constructor() {
    this.supabaseUrl = PROJECT_URL
    this.apiKey = API_KEY

    this.supabase = createClient(this.supabaseUrl, this.apiKey)
  }

  signUp = async (email, password) => {
    const {data, error} = await this.supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) throw new Error(error.message)
    return data
  }

  signIn = async (email, password) => {
    const {data, error} = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) throw new Error(error.message)
    return data
  }

  signOut = async () => {
    const {error} = await this.supabase.auth.signOut()
    if (error) throw new Error(error.message)
  }

  getCurrentUser = () => {
    return this.supabase.auth.getUser()
  }

  getSession = () => {
    return this.supabase.auth.getSession()
  }

  resetPassword = async (email) => {
    const {error} = await this.supabase.auth.resetPasswordForEmail(email)
    if (error) throw new Error(error.message)
  }
}