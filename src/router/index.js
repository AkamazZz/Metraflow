import TokenService from "@/api/token.service"
import jwt_decode from "jwt-decode"
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import tokenService from "../api/token.service"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const token = tokenService.getUser() ? tokenService.getUser().access : null
    if(token === null){
      next({ name: 'login' }) // Redirect to the login page
      
      return 
    }
    const decoded = jwt_decode(token) 

    // console.log(decoded)
    const tokenExpired = tokenService.checkTokenExpiration(decoded.exp)

    // console.log(tokenExpired)
    if( tokenExpired ){
      TokenService.removeUser()
      next({ name: 'login' }) // Redirect to the login page
      
    }
   
  }

  next() // Continue navigation

})

export default router
