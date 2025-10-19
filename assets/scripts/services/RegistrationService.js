export class RegistrationService {
  constructor(supabaseService) {
    this.supabaseService = supabaseService
  }

  registerUser = async (data) => {
    if (!data.email || !data.password) throw new Error('Email и пароль обязательны!')
    if (data.password.length < 6) throw new Error('Пароль не может быть меньше 6 символов!')

    try {
      const result = await this.supabaseService.signUp(data.email, data.password)

      console.log('Supabase response:', result)

      if (result.user?.identities?.length === 0) {
        return {
          success: false,
          message: 'Пользователь с таким email уже существует!'
        }
      }

      if (result.user && !result.user.user_metadata.email_verified) {
        return {
          success: true,
          message: `Регистрация прошла успешно! Проверьте почту ${result.user.user_metadata.email} для подтверждения регистрации.`
        }
      }

      return {
        success: true,
        message: 'Регистрация успешна!',
        user: result.user
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}