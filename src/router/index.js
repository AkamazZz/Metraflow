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
  const token = tokenService.getUser().access
  const decoded = token ? jwt_decode(token) : null
  if(decoded != null  ){
    if (decoded.exp < (new Date().getTime() + 1) / 1000) {
      TokenService.removeUser()
      next({ name: '/login' }) // Redirect to the login page
      
      return 
    }
  }
  if(to.name == 'map' || to.name == 'dashboard'){

    if(!token){
      next({ name: 'login' }) // Redirect to the 404 page
    }

  }

  next() // Continue navigation

})

export default router
