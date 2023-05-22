<template>
  <div class="text-center">
    <VDialog
      v-model="props.isDialogEnabled"
      width="1400"
      max-width="1500"
    >
      <VCard>
        <VCardText class="d-flex justify-center mt-5">
          <div class="parent-container">
            <iframe
              id="ifrm"
              class="rounded elevation-10 "
              width="1280px;"
              height="720px;"
              frameborder="0"
              src="http://34.118.42.3:5000/video_feed"
            />
          </div>
          <!--
            <VImg
            class="mx-auto"

            
            height="300"
            lazy-src="https://picsum.photos/id/11/100/60"
            >
            <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
            <VProgressCircular
            v-if="isVideoLoading"
            color="primary"
            indeterminate
            />
            </div>
            </template>
            </VImg> 
          -->
        </VCardText>
        <h1 class="d-flex align-center justify-center">
          Is there any problem? Report it
        </h1>
        <VRow justify="center">
          <VSlideGroup
            class="pa-2 "
            selected-class="primary"
            show-arrows
          >
            <VSlideGroupItem
              v-for="n in typeReportsJSON"

              :key="n.type"
              v-slot="{ selectedClass }"
            >
              <VCard
                :disabled="isSendingReport && currentReportType !== n.type"

                color="grey-lighten-1"
                class="ma-4"
                :class="[selectedClass]"
                height="200"
                width="200"
                @click="sendReport(n.type)"
              >
                <VCol
                  v-if="!isSendingReport || currentReportType !== n.type"
                >
                  <VImg
                    class="d-flex justify-center align-center"
                    :src="n.icon"
                    height="150"
                  />  
                  <h3 class="d-flex justify-center align-center">
                    {{ n.type }}
                  </h3>
                </VCol>
                <div class="d-flex fill-height align-center justify-center">
                  <VScaleTransition>
                    <!--
                      <VIcon
                      v-if="isSelected"
                      color="white"
                      size="48"
                      icon="mdi-close-circle-outline"
                      /> 
                    -->
                    <VProgressCircular
                      v-if="isSendingReport && currentReportType === n.type"
                      indeterminate
                    />
                  </VScaleTransition>
                </div>
              </VCard>
            </VSlideGroupItem>
          </VSlideGroup>
        </VRow>
        <VCardActions>
          <VBtn
            height="50px"
            color="primary"
            block
            variant="tonal"
            @click="modalClosed"
          >
            Close Dialog
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
// import { getCurrentInstance, onBeforeMount } from "vue"
import congestionIcon from '@/assets/images/map/report/congestion.png'
import constructionIcon from '@/assets/images/map/report/construction.png'
import crashIcon from '@/assets/images/map/report/crash.png'

import {addIncident} from '@/api/map.service'

const props = defineProps({
  isDialogEnabled: {
    type: Boolean,
    default: false,
  },
  cameraInfo:{
    type: Object,
    default: {},
  },
  coordinates:{
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['closeDialog', 'refreshIncidents'])
const isSendingReport = ref(false)
const currentReportType = ref('')
const typeReportsJSON = ref([{ type: 'Congestion', icon: congestionIcon },
  { type: 'Road closure', icon: constructionIcon },
  { type: 'Crash', icon: crashIcon }])

const isVideoLoading = ref(true)
const reconnectAttempts = ref(0)
const maxReconnectAttempts = 5
const reconnectDelay = 2000 // 3 seconds
let socket = null

async function sendReport(type){
  isSendingReport.value = true
  currentReportType.value = type
  console.log( props.coordinates)
  await addIncident({latitude: parseFloat(props.coordinates[0]), longitude: parseFloat(props.coordinates[1]), comment: currentReportType.value})
  isSendingReport.value = false 
  
  setTimeout(() => {
    emit('refreshIncidents')
  }, 2000)


  // const report = {
  //   type: currentReportType.value,
  //   location: props.cameraInfo.location,
  //   guid: props.cameraInfo.guid,
  // }
  // console.log(report)
  // await fetch('https://example.com/report', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(report),
  // })
  // isSendingReport.value = false
  // emit('closeDialog')
}

async function connectWebSocket(){
  socket = new WebSocket('wss://example.com/socket')
  

  socket.addEventListener('close', () => {
    console.log('WebSocket connect closed.')
   
    if (reconnectAttempts.value < maxReconnectAttempts) {

      setTimeout(async () => {
        await connectWebSocket()
        reconnectAttempts.value++
        
  
      }, 1000)
      
    } else {
      console.log('Exceeded maximum reconnect attempts.')
    }
  })
  socket.addEventListener('open', () => {
    console.log('WebSocket connection established.')
    reconnectAttempts.value = 0
  })

  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    messages.value.push(message)
  })
}

onBeforeMount(async () => {
  // await connectWebSocket()
  // console.log(props.coordinates)
})

// console.log('beforeMount')
// console.log(proxy.$socket)
// proxy.$socket.$connect('') 

// console.log(guids.value)

//   console.log(`the component is now mounted.`)
//   geoLocChange.value = loc => {
//     console.log(loc); view.value.fit([loc[0], loc[1], loc[0], loc[1]], { maxZoom:
// 14 }) } 

// await createRouteForCar()
  



function modalClosed(){
  emit('closeDialog')
}
</script>

<!--
  <style>
  .parent-container {
  width: 115%;
  height: 600px;
  padding: 0;
  overflow: hidden;
  }

  .parent-container iframe {

  -ms-zoom: 0.5;
  -ms-transform-origin: 0 0;
  -moz-transform: scale(0.75);
  -o-transform: scale(0.75);
  -webkit-transform: scale(0.75);
  -webkit-transform-origin: 0 0;

  /* position it, as if it was the original size */
  width: 115%;
  height: 745px;
  overflow: hidden;

  }
  </style> 
-->