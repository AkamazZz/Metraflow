<script setup>
import DrawerContent from './DrawerContent.vue'
import { VerticalNavLayout } from '@layouts'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

import { computed } from 'vue'
import {useAuthStore} from '@/store/auth.store'
import { storeToRefs } from 'pinia'



const authStore = useAuthStore()


const { isAuthenticated, getUser} = storeToRefs(authStore)

// Computed property to check if user is logged in
const isLoggedIn = computed(() => isAuthenticated)
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>
      <VSpacer />

     
      <NavbarThemeSwitcher />
      <VBtn
        icon
        variant="text"
        color="default"
        class="me-2"
        size="small"
      >
        <VIcon
          icon="mdi-bell-outline"
          size="24"
        />
      </VBtn>
      <!-- Conditional rendering of login/reg buttons or user profile -->
      <template v-if="isLoggedIn.value">
        <UserProfile />
      </template>
      <template v-else>
        <VBtn
          icon
          color="default"

          class="ms-1 me-2"
          to="/login"
        >
          <VIcon icon="mdi-login" />
          <div>Login</div>
        </VBtn>
        <VBtn
          icon
          color="default"
        
          class="ms-2 me-2"
          to="/register"
        >
          <VIcon icon="mdi-logout" />
          <div>Reg</div>
        </VBtn>
      </template>
    </template>

    <!-- 👉 Drawer content -->
    <template #navigation-drawer-content>
      <DrawerContent />
    </template>

    <!-- 👉 Pages -->
    <div class="layout-page-content">
      <RouterView />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss">
.app-bar-search {
  .v-input__control {
    width: 236px
  }

  .v-field__outline__start {
    border-radius: 28px 0 0 28px !important;
    flex-basis: 20px !important;
  }

  .v-field__outline__end {
    border-radius: 0 28px 28px 0 !important;
  }
}
.v-btn__content {
  display:flex;
  flex-direction:column;
}
</style>
