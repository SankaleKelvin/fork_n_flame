import { defineStore } from "pinia";
import TokenService from "../services/tokenService";

export const useAuthStore = defineStore('auth', {
    state: (()=>{
        const isLoggedIn = !!TokenService.getToken();
    }),
    actions: {
        login(token){
            TokenService.setToken(token);
            this.isLoggedIn = true;
        },
        logout(){
            TokenService.logout();
            this.isLoggedIn = false;
        }
    }
}
)