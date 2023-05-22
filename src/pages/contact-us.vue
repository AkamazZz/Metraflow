<template>
  <VCard>
    <VContainer
      fluid
      class="ma-0 pa-0"
    >
      <VCard
        width="100%"
        height="400px"
        class="d-flex justify-center align-center"
        style="background: linear-gradient(0deg, rgba(237,204,252,1) 0%, rgba(196,164,249,1) 15%, rgba(145,85,243,1) 100%); color: white"
      >
        <Vcol
          cols="12"
          md="9"
          sm="6"
        >
          <VRow
            align="center"
            justify="center"
          >
            <p class="font-weight-bold   text-3xl text-uppercase text-center">
              More than just a traffic app
            </p>
          </VRow>
          <VRow
            align="center"
            class="mt-2"
            justify="center"
          >
            <VCol
              cols="4"
            >
              <p class="font-weight-light display-2 text-2xl text-uppercase text-center">
                Find your way
              </p>
            </VCol>
            <VCol
              cols="4"
            >
              <p class="font-weight-light display-2 text-2xl text-uppercase text-center">
                Connect with others
              </p>
            </VCol>
            <VCol
              cols="4"
            >
              <p class="font-weight-light display-2 text-2xl text-uppercase text-center">
                Manage traffic
              </p>
            </VCol>
          </VRow>
          <VRow
            class="mt-6 "
            align="center"
            justify="center"
          >
            <VBtn
              size="large"    
              class="font-weight-light display-2 text-2xl "
              color="white"
              to="/register"
            >
              Get Started
            </VBtn>
          </VRow>
        </Vcol>
      </VCard>
      <VRow
        class="mt-5 mb-5"
        align="center"
        justify="center"
      >
        <VCard
          color="#26c6da"
          height="10vh"
        />
        <VCol cols="10">
          <VRow justify="center">
            <VCol
              cols="12"
              sm="5"
            >
              <h1 class="font-weight-light display-1">
                Get in Touch
              </h1>
              <h3 class="font-weight-light mt-3">
                If you have any questions or need help, please fill out the form below. We do our best to respond within 1 business day.
              </h3>
              
              <h3 class="font-weight-light mt-3">
                Phone: +7 (xxx) xxx-xx-xx
              </h3>
              <h3 class="font-weight-light mt-3">
                Email: email@email.com
              </h3>
            </VCol>
            <VCol
              cols="12"
              sm="7"
            >
              <VForm
                ref="form"
                v-model="valid"
              >
                <VTextField
                  v-model="name"
                  class="ma-2 pa-2"
            
                  :rules="nameRules"
                  label="Name and Surname"
                  required
                />

                <VTextField
                  v-model="email"
                  class="ma-2 pa-2"
                  :rules="emailRules"
                  label="E-mail"
                  required
                />

                <VTextarea
                  v-model="textArea"
                  class="ma-2 pa-2"
                  :rules="textAreaRules"
                  label="Message"
                  required
                />

                <VBtn
                  color="primary"
                  :dark="valid"
                  block
                  rounded="xs"
                  class="mt-3"
                  @click="submit"
                >
                  Send Message
                </VBtn>
              </VForm>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>


<script setup>
import { ref, computed } from 'vue'

// Data variables
const icons = ref(["fa-facebook", "fa-twitter", "fa-linkedin", "fa-instagram"])
const valid = ref(true)
const name = ref("")
const email = ref("")
const textArea = ref("")
const lazy = ref(false)
const form = ref({})

// Validation rules
const nameRules = [
  v => !!v || "The text field is required",
  v => (v && v.length >= 6) || "Name must be more than 6 characters",
]
const emailRules = [
  v => !!v || "The text field is required",
  v => /.+@.+\..+/.test(v) || "Email must be valid",
]
const textAreaRules = [
  v => !!v || "The text field is required",
  v => (v && v.length >= 10) || "Minimum 10 characters",
]

// Computed properties
const isFormValid = computed(() => {
  // Add your custom form validation logic here
  return valid.value && name.value && email.value && textArea.value
})
</script>