export class CryptoService {
  constructor() {
    if (typeof bcrypt === 'undefined') throw new Error('ошибка в подключении bcrypt')
    this.bcrypt = bcrypt
  }

  hashPassword = async (password) => {
    try {
      const salt = this.bcrypt.genSaltSync(10)
      return this.bcrypt.hashSync(password, salt)
    } catch (e) {
      throw new Error(e)
    }
  }

  comparePassword = async (password, hash) => {
    try {
      return this.bcrypt.compareSync(password, hash)
    } catch (e) {
      throw new Error(e)
    }
  }
}