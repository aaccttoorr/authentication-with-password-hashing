export class StorageService {
  constructor(key = 'users') {
    this.key = key
  }

  getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(this.key) || [])
    } catch (e) {
      console.error(e)
      return []
    }
  }

  saveUser = (data) => {
    try {
      localStorage.setItem(this.key, JSON.stringify(data))
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}