import {SupabaseService} from "./services/SupabaseService.js"
import {RegistrationService} from "./services/RegistrationService.js"
import {RegistrationUI} from "./ui/RegistrationUI.js"
import {AuthorizationService} from "./services/AuthorizationService.js"
import {AuthorizationUI} from "./ui/AuthorizationUI.js"

const supabaseService = new SupabaseService()

const registrationService = new RegistrationService(supabaseService)
const authorizationService = new AuthorizationService(supabaseService)

new RegistrationUI(registrationService)
new AuthorizationUI(authorizationService)

async function updateAuthUI() {
  const authForms = document.querySelector('[data-auth-forms]')
  const userInfo = document.querySelector('[data-user-info]')
  const userEmail = document.querySelector('[data-user-email]')

  try {
    const user = await authorizationService.getCurrentUser()

    if (user.data.user) {
      if (authForms) authForms.style.display = 'none'
      if (userInfo) userInfo.style.display = 'flex'
      if (userEmail) userEmail.textContent = user.data.user.email
      console.log(user)
    } else {
      if (authForms) authForms.style.display = 'flex'
      if (userInfo) userInfo.style.display = 'none'
    }
  } catch (error) {
    if (authForms) authForms.style.display = 'flex'
    if (userInfo) userInfo.style.display = 'none'
  }
}

window.addEventListener('authStateChanged', updateAuthUI)

document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI()
})