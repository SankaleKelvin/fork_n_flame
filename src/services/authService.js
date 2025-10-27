import TokenService from './tokenService'

class AuthService {
  static isLoggedIn() {
    return !!TokenService.getToken()
  }

  static hasAbility(ability) {
    const userAbilities = TokenService.getAbilities()
    if(!userAbilities){
      return false;
    }
    const required = Array.isArray(ability) ? ability : [ability]
    return required.some(ability => userAbilities[ability] === true)
  }
}

export default AuthService
