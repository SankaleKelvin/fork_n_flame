class TokenService {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  static getToken() {
    localStorage.getItem('token')
  }

  static getUser() {
    localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  static logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  static clear(){
    localStorage.clear();
  }
}

export default TokenService;
