export class AuthorizationService {
  constructor(userRepository, cryptoService) {
    this.userRepository = userRepository
    this.cryptoService = cryptoService
  }

  authorize = async (data) => {
    if (!data.username || !data.password) throw new Error('Логин и пароль обязательны!')

    const user = this.userRepository.findByUsername(data.username)
    if (!user) throw new Error('Пользователь не найден!')

    const isPasswordValid = await this.cryptoService.comparePassword(data.password, user.passwordHash)
    if (!isPasswordValid) throw new Error('Неверный пароль!')

    return {
      success: true,
      message: 'Вход выполнен успешно!',
      user: { id: user.id, username: user.username }
    }
  }
}