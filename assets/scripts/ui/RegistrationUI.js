export class RegistrationUI {
  selectors = {
    root: '[data-registration-form]',
    loginInput: '[data-registration-form-login]',
    passwordInput: '[data-registration-form-password]',
    button: '[data-registration-form-button]',
    message: '[data-registration-form-message]',
  }

  stateClasses = {
    isVisible: 'is-visible',
  }

  constructor(registrationService) {
    this.registrationService = registrationService
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) return

    this.loginInputElement = this.rootElement.querySelector(this.selectors.loginInput)
    this.passwordInputElement = this.rootElement.querySelector(this.selectors.passwordInput)
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.messageElement = this.rootElement.querySelector(this.selectors.message)

    this.bindEvents()
  }

  handleRegistration = async () => {
    const username = this.loginInputElement.value.trim()
    const password = this.passwordInputElement.value.trim()

    this.clearMessage()

    try {
      const response = await this.registrationService.registerUser({
        username,
        password
      })

      this.showMessage(response.message, 'success')
      this.clearForm()

      setTimeout(() => this.clearMessage(), 1500)
    } catch (e) {
      this.showMessage(e.message, 'error')
      setTimeout(() => this.clearMessage(), 1500)
    }
  }

  showMessage = (message) => {
    if (this.messageElement) {
      this.messageElement.textContent = ''
      this.messageElement.textContent = message
      this.messageElement.classList.add(this.stateClasses.isVisible)
    }
  }

  clearMessage = () => {
    if (this.messageElement) {
      this.messageElement.classList.remove(this.stateClasses.isVisible)
    }
  }

  clearForm = () => {
    this.loginInputElement.value = ''
    this.passwordInputElement.value = ''
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.handleRegistration)
  }
}