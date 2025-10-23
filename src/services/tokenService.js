class TokenService {
  static setToken(data) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }


  static getToken() {
    return localStorage.getItem('token')
  }

  static getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  static logout() {
    localStorage.clear();
  }

}
export default TokenService;
