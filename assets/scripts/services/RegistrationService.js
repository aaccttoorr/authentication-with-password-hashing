export class RegistrationService {
  constructor(userRepository, cryptoService) {
    this.userRepository = userRepository
    this.cryptoService = cryptoService
  }

  registerUser = async (data) => {
    if (!data.username || !data.password) throw new Error('Логин и пароль обязательны!')
    if (data.password.length < 6) throw new Error('Пароль не может быть меньше 6 символов!')

    const existingUser = this.userRepository.findByUsername(data.username)
    if (existingUser) throw new Error('Пользователь уже существует!')

    const passwordHash = await this.cryptoService.hashPassword(data.password)

    const user = await this.userRepository.createUser({
      username: data.username,
      passwordHash: passwordHash,
    })

    return {
      success: true,
      message: 'Пользователь успешно зарегистрирован',
    }
  }
}
