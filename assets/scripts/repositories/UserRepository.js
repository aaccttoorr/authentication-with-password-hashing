export class UserRepository {
  constructor(storageService) {
    this.storageService = storageService
  }

  findByUsername = (username) => {
    const users = this.storageService.getUsers()
    return users.find((user) => user.username === username)
  }

  createUser = async (data) => {
    const users = this.storageService.getUsers()

    const user = {
      id: Date.now().toString(),
      username: data.username,
      passwordHash: data.passwordHash,
    }

    users.push(user)

    const success = this.storageService.saveUser(users)
    if (!success) throw new Error('ошибка при сохранении пользователя')

    return user
  }
}