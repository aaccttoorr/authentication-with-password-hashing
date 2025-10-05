import {StorageService} from "./services/StorageService.js";
import {CryptoService} from "./services/CryptoService.js";
import {UserRepository} from "./repositories/UserRepository.js";
import {RegistrationService} from "./services/RegistrationService.js";
import {RegistrationUI} from "./ui/RegistrationUI.js";
import {AuthorizationService} from "./services/AuthorizationService.js";
import {AuthorizationUI} from "./ui/AuthorizationUI.js";

const storageService = new StorageService('users')
const cryptoService = new CryptoService()
const userRepository = new UserRepository(storageService)
const registrationService = new RegistrationService(userRepository, cryptoService)
const authorizationService = new AuthorizationService(userRepository, cryptoService)

new RegistrationUI(registrationService);
new AuthorizationUI(authorizationService)