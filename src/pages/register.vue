<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'

import { useAuthStore } from "../store/auth.store"
import router from "../router/index"
import { toast } from "vue3-toastify"


const isDisabled = ref(false)
const form = ref({
  username: '',
  first_name: '',
  last_name:'',
  email: '',
  password: '',
  re_password: '',
  privacyPolicies: false,
})
const vuetifyTheme = useTheme()
console.log(vuetifyTheme.global.name.value)
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)




const emailRule = [
  value => {
    if (value) return true

    return 'E-mail is requred.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
]
const nameRules = [
  value => {
    if (value) return true

    return 'Name is requred.'
  },
  value => {
    if (value?.length <= 10) return true

    return 'Name must be less than 10 characters.'
  },
]
const required = v => !!v || "This field is required"
const minLength = min => v =>
  (v || "").length >= min || `Must have at least ${min} characters`
const sameAs = target => v =>
  v === target || "Passwords do not match"

async function handleSubmit() {

  const isValid = Object.values(form.value).every(field => field !== '')

  if (!isValid) {
    toast.error("Please fill in all required fields.")
    
    return
  }

  
  isDisabled.value = true
  
  const authStore = useAuthStore()
  try {
    console.log(form.value)
    await authStore.register({
      username: form.value.username,
      first_name: form.value.first_name,
      last_name:  form.value.last_name,
      email: form.value.email,  
      password: form.value.password,
      re_password: form.value.re_password,
     
    })
    console.log("success")  
    toast.success("Registration successful.")
    router.push("/login")
  } catch (error) {
    isDisabled.value = false
    console.log(error)
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
    })
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Metraflow
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Get ready for a journey
        </h5>
        <p class="mb-0">
          Experience effortless app-based traffic management!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                :rules="[required, minLength(3)]"
                label="Username"
              />
            </VCol>
            <!-- name -->
            <VCol cols="12">
              <VTextField
                v-model="form.first_name"
                :rules="nameRules"
                label="Name"
              />
            </VCol>
            <!-- name -->

            <VCol cols="12">
              <VTextField
                v-model="form.last_name"
                :rules="nameRules"
                label="Surname"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                :rules="emailRule"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                :rules="[required, minLength(8)]"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.re_password"
                label="Confirm password"
                :rules="[required, sameAs(form.password)]"
                :type="isPasswordVisible ? 'text' : 'password'"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
              <VProgressLinear
                v-if="isDisabled"
                class="mt-4"
                color="primary"
                indeterminate
              />
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
