export class RegistrationUI {
  constructor(registrationService) {
    this.registrationService = registrationService
    this.init()
  }

  init() {
    const form = document.querySelector('[data-registration-form]')
    const emailInput = document.querySelector('[data-registration-form-email]')
    const passwordInput = document.querySelector('[data-registration-form-password]')
    const button = document.querySelector('[data-registration-form-button]')
    const message = document.querySelector('[data-registration-form-message]')

    if (form) {
      form.addEventListener('submit', this.handleRegistration.bind(this))
    }

    this.elements = { emailInput, passwordInput, button, message }
  }

  async handleRegistration(event) {
    event.preventDefault()

    const email = this.elements.emailInput?.value
    const password = this.elements.passwordInput?.value

    console.log('Form data:', { email, password })

    if (!this.elements.message) {
      return
    }

    try {
      this.showMessage('Регистрация...', 'info')

      const result = await this.registrationService.registerUser({
        email: email,
        password: password
      })


      this.showMessage(result.message, result.success ? 'success' : 'error')

      if (result.success) {
        if (this.elements.emailInput) this.elements.emailInput.value = ''
        if (this.elements.passwordInput) this.elements.passwordInput.value = ''
      }

    } catch (error) {
      this.showMessage('Ошибка регистрации: ' + error.message, 'error')
    }
  }

  showMessage(text, type = 'info') {

    if (!this.elements.message) {
      return
    }

    this.elements.message.textContent = text
    this.elements.message.className = 'authentication__message'

    const typeClass = `authentication__message--${type}`
    this.elements.message.classList.add(typeClass)

    this.elements.message.classList.add('is-visible')

    setTimeout(() => {
      if (this.elements.message) {
        this.elements.message.classList.remove('is-visible')

      }
    }, 5000)
  }
}