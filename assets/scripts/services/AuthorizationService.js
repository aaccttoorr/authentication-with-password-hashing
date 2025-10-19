export class AuthorizationService {
  constructor(supabaseService) {
    this.supabaseService = supabaseService
  }

  authorize = async (data) => {
    if (!data.email || !data.password) throw new Error('Email и пароль обязательны!')

    try {
      const result = await this.supabaseService.signIn(data.email, data.password)

      return {
        success: true,
        message: 'Вход выполнен успешно!',
        user: result.user,
        session: result.session
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  signOut = async () => {
    try {
      await this.supabaseService.signOut()
      return { success: true, message: 'Выход выполнен успешно!' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getCurrentUser = async () => {
    try {
      return await this.supabaseService.getCurrentUser()
    } catch (error) {
      return null
    }
  }
}