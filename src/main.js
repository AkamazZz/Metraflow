/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import OpenLayersMap from "vue3-openlayers"
import "vue3-openlayers/dist/vue3-openlayers.css"
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// import Slideout from '@hyjiacan/vue-slideout'
// import '@hyjiacan/vue-slideout/dist/slideout.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// import VueNativeSock from "vue-native-websocket-vue3"

// Use the Vue Native Sock plug-in and perform related configuration

// import Slideout component, and set the defaults props



loadFonts()
const app = createApp(App)
const pinia = createPinia()
setActivePinia(pinia)
app.use(pinia)

// app.use(Slideout, {
//   renderWhenVisible: true})
app.component('VueDatePicker', VueDatePicker)
app.use(VueAxios, axios)
app.provide('axios') 
app.use(vuetify)
app.use(router)
app.use(Vue3Toastify, {autoClose: 1500})
app.use(OpenLayersMap)

// app.use(VueNativeSock,"ws://localhost:9090", {
//   reconnection: true, // (Boolean) whether to reconnect automatically (false)
//   reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//   reconnectionDelay: 1500, // (Number) how long to initially wait before attempting a new (1000)
// })
app.mount('#app')

