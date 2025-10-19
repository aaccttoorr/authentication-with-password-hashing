export class AuthorizationUI {
  constructor(authorizationService) {
    this.authorizationService = authorizationService
    this.init()
  }

  init() {

    const form = document.querySelector('[data-authorization-form]')
    const emailInput = document.querySelector('[data-authorization-form-email]')
    const passwordInput = document.querySelector('[data-authorization-form-password]')
    const button = document.querySelector('[data-authorization-form-button]')
    const message = document.querySelector('[data-authorization-form-message]')
    const logoutButton = document.querySelector('[data-logout-button]')

    if (form) {
      form.addEventListener('submit', this.handleAuthorization.bind(this))
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', this.handleLogout.bind(this))
    }

    this.elements = { emailInput, passwordInput, button, message, logoutButton }
  }

  async handleAuthorization(event) {
    event.preventDefault()

    const email = this.elements.emailInput?.value
    const password = this.elements.passwordInput?.value

    if (!this.elements.message) {
      return
    }

    try {
      this.showMessage('Вход...', 'info')

      const result = await this.authorizationService.authorize({
        email: email,
        password: password
      })

      this.showMessage(result.message, 'success')

      if (this.elements.emailInput) this.elements.emailInput.value = ''
      if (this.elements.passwordInput) this.elements.passwordInput.value = ''

      window.dispatchEvent(new CustomEvent('authStateChanged'))

    } catch (error) {
      this.showMessage('Ошибка авторизации: ' + error.message, 'error')
    }
  }

  async handleLogout() {
    try {
      await this.authorizationService.signOut()
      window.dispatchEvent(new CustomEvent('authStateChanged'))
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  showMessage(text, type = 'info') {

    if (!this.elements.message) {
      return
    }

    this.elements.message.textContent = text
    this.elements.message.className = 'authentication__message'

    switch (type) {
      case 'success':
        this.elements.message.classList.add('authentication__message--success', 'is-visible')
        break
      case 'error':
        this.elements.message.classList.add('authentication__message--error', 'is-visible')
        break
      default:
        this.elements.message.classList.add('authentication__message--info', 'is-visible')
    }

    setTimeout(() => {
      if (this.elements.message) {
        this.elements.message.textContent = ''
        this.elements.message.className = 'authentication__message'
        this.elements.message.classList.remove('is-visible')
      }
    }, 5000)
  }
}