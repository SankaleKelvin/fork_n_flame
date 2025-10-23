import axios from 'axios'
import TokenService from './tokenService'


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
},
(error)=> Promise.reject(error))

export default api

