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
  email: '',
  password: '',
  remember: false,
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)

const emailRule = [
  value => {
    if (value) return true

    return 'E-mail is required.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
]

const minLength = min => v =>
  (v || "").length >= min || `Must have at least ${min} characters`

const required = v => !!v || "This field is required"

async function handleSubmit() {
  const isValid = Object.values(form.value).every(field => field !== '')
  console.log(isValid)
  if (!isValid) {
    toast.error("Please fill in all required fields.")   

    return
  }
  isDisabled.value = true
  const authStore = useAuthStore()
  try {
    await authStore.login({
      email: form.value.email,
      password: form.value.password,
    })
    toast.success("Login successful.")
    router.push("/").then(() => {
      router.go()
    })
  } catch (error) {
    isDisabled.value = false

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
          Welcome to metraflow! 👋🏻
        </h5>
        <p class="mb-0">
          Get ready for an adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
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
                :rules="[required, minLength(8)]"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
              
              <VProgressLinear
                v-if=" isDisabled"
                class="mt-4"
                color="primary"
                indeterminate
              />
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                Create an account
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