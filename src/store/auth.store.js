import { defineStore } from 'pinia'
import { login, logout, register, setAuthHeader } from '../api/auth.service'
import tokenService from '../api/token.service'
import router from '../router/index'
const token = computed(() => tokenService.getUser())
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user:localStorage.getItem("user")|| null,  
  }),
  getters: {
    isAuthenticated(state) {
      
      return !!state.user
    },
    isAdmin(state) {
      return state.user?.role === 'admin'
    },
    getUser(){
      return this.user
    },
  },
  actions: {
    async login(credentials) {
      try {
        const response = await login(credentials)     
        const token = JSON.stringify(response)

        setAuthHeader(token)
      } catch (error) {

        // Check if error.response exists before trying to access its properties
        if (error.response) {
          console.log(error.response.data)
          
          return error.response.data 
        } else {
          
          console.log(error.detail)

          throw error.detail
        }
      }
    },
    async register(user) {
      try {
        console.log("logging user")
        const response = await register(user)
      } catch (error) {
        // if (error.response) {
        //   console.log(error.response.data)
          
        //   return error.response.data 
        // } else {
          
        //   console.log(error.detail)
          console.log(error)
          throw error
        // }
      }
    },
    async logout() {
      try {
        await logout()
        await router.push('/')
        await router.go()

      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
