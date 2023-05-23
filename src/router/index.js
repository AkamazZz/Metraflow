import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
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
  const token = localStorage.getItem('user');

  if(to.name == 'map' || to.name == 'dashboard'){

    if(!token){
      next({ name: 'login' }); // Redirect to the 404 page
    }

  }

    next(); // Continue navigation

});

export default router
