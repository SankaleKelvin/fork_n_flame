import TokenService from "./tokenService"

class AuthService {    

    static isLoggedIn(){
        return !!TokenService.getToken();
    }
}

export default AuthService;