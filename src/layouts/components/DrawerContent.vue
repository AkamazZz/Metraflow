<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

import {useAuthStore} from '@/store/auth.store'
import { storeToRefs } from 'pinia'



const authStore = useAuthStore()


const { isAuthenticated } = storeToRefs(authStore)

// Computed property to check if user is logged in
const isLoggedIn = computed(() => isAuthenticated)

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <div v-html="logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          MetraFlow
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul v-if="isAuthenticated">
    <VerticalNavLink
      :item="{
        title: 'Main',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Contact Us',
        to: 'contact-us',
        icon: { icon: 'mdi-phone-outline' }
      }"
    />
    <VerticalNavLink

      :item="{
        title: 'Map',
        to: 'map', 
        icon: { icon: 'mdi-map-outline' }
      }"
    />
    <VerticalNavLink
      
      :item="{
        title: 'Dashboard',
        to: 'dashboard', 
        icon: { icon: 'mdi-clipboard-outline' }
      }"
    />
    <!--
      <VerticalNavLink
      :item="{
      title: 'Traffic data',
      to: 'icons',
      icon: { icon: 'mdi-account-cog-outline' }
      }"
      />
    -->
    <!--
      👉 Pages
      <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
      <VerticalNavLink
      :item="{
      title: 'Login',
      to: 'login',
      target: '_blank',
      icon: { icon: 'mdi-login' }
      }"
      />
      <VerticalNavLink
      :item="{
      title: 'Register',
      to: 'register',
      icon: { icon: 'mdi-account-plus-outline' }
      }"
      />

      ℹ️ This path doesn't exist so 404 route will catch this undefined path 
      <VerticalNavLink
      :item="{
      title: 'Error',
      to: { path: '/error' },
   
      icon: { icon: 'mdi-alert-circle-outline' }
      }"
      />

      👉 User Interface 
      <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

      <VerticalNavLink
      :item="{
      title: 'Typography',
      to: 'typography',
      icon: { icon: 'mdi-alpha-t-box-outline' }
      }"
      />
      <VerticalNavLink
      :item="{
      title: 'Icons',
      to: 'icons',
      icon: { icon: 'mdi-eye-outline' }
      }"
      />
      <VerticalNavLink
      :item="{
      title: 'Cards',
      to: 'card-basic',
      icon: { icon: 'mdi-credit-card-outline' }
      }"
      />
      <VerticalNavLink
      :item="{
      title: 'Tables',
      to: 'tables',
      icon: { icon: 'mdi-table' }
      }"
      />
      <VerticalNavLink
      :item="{
      title: 'Form Layouts',
      to: 'form-layouts',
      icon: { icon: 'mdi-form-select' }
      }"
      /> 
    -->
  </ul>
  <ul v-else>
    <VerticalNavLink

      :item="{  
        title: 'Main',
        to: 'index', 
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Contact Us',
        to: 'contact-us',
        icon: { icon: 'mdi-phone' }
      }"
    />
  </ul>
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
