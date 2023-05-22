<!--
  <script setup>
  mport {useAuthStore} from '@/store/auth.store'
  import { storeToRefs } from 'pinia'



  const authStore = useAuthStore()


  const { isAuthenticated } = storeToRefs(authStore)

  // Computed property to check if user is logged in
  const isLoggedIn = computed(() => isAuthenticated)
  </script> 
-->

<template>  
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
