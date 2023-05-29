<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <v-row>
    <v-col
      cols="12"
      md="3"
      sm="12"
    >
      <v-card
      
        style="height:700px;"
      >
        <v-row
          align="center"
          justify="center"
          class="mt-5 mr-5 ml-5"
        >
          <VueDatePicker
            v-model="date"
            position="left"
            :esc-close="true"
            :space-confirm="false"
            range
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mt-4"
        >
          <v-btn
            variant="text"
            @click="resetTime"
          >
            Reset 
          </v-btn>
        </v-row>
        <v-slider
          v-model="historySlider"

          color="error"
          class="mt-1 mb-1 ml-5 mr-5" 
          :min="0"
          :max="maxHistorySlider"
          :step="1"
        />  
     
        <CarTypeList
          :is-route-enabled="showPredLayer"
          :car-types="guids"
          :items-per-page="5"
          :is-disabled="historyCarListGenerated"
          @select="onCarTypeSelect"
        />
      </v-card>  
    </v-col>
    <v-col
      cols="12"
      md="9"
      sm="12"
    >
      <v-card>
        <div>
          <ol-map
            ref="map"
            style="height:700px"
          >
            <ol-geolocation
              :projection="projection"
              @positionChanged="geoLocChange"
            >
              <ol-view
                ref="view"
                :center="center"
                :rotation="rotation"
                :zoom="zoom"
                :projection="projection"
              /> 
           
              <ol-zoom-control />
         
              <ol-scaleline-control />
         
              <ol-tile-layer>
                <ol-source-osm />
              </ol-tile-layer>  

             
              <ol-interaction-clusterselect
                v-if="showTrafficLayer && !showRouteLayer"
                

                :point-radius="20"
                @select="featureSelected"
              >
                <ol-style>
                  <ol-style-stroke
                    color="green"
                    :width="5"
                  />
                  <ol-style-fill color="rgba(255,255,255,0.5)" /> 
                  <ol-style-icon
                    :src="mapImage"
                    :scale="0.05"
                  />
                </ol-style>
              </ol-interaction-clusterselect>

              <ol-vector-layer :z-index="4"> 
                <ol-source-vector
                  v-if="showRouteLayer"
                  ref="routeVectors"
                  :projection="projection"
                  :zoom="zoom"
                >
                  <ol-interaction-draw
                    
                    :type="drawType"  
                    @drawstart="drawstart"
                  />
                  <ol-style>
                    <ol-style-stroke
                      color="rgba(128, 31, 255, 0.95)"
                      :width="4"
                    />
                    <ol-style-fill color="rgba(255,255,255,1)" />
                    
                    <ol-style-circle :radius="10">
                      <ol-style-fill color="blue" />
                    </ol-style-circle> 
                   
                    <ol-style-icon
                      :src="redMapPlaceholder"
                      :scale="0.05"
                      :anchor="[0.5, 1]"
                    />  
                  </ol-style>
                </ol-source-vector>
              </ol-vector-layer>
              <ol-vector-layer :z-index="2"> 
                <ol-source-vector
                  v-if="showPredLayer"
                  ref="historyRouteVectors"
                  :projection="projection"
                  :zoom="zoom"
                />
      
                <ol-style>
                  <ol-style-stroke
                    color="rgba(224, 31, 35, 0.95)"
                    :width="5"
                  />
                  <ol-style-fill color="rgba(255,255,255,0.1)" />
                  <ol-style-circle :radius="7">
                    <ol-style-fill color="blue" />
                  </ol-style-circle>
                </ol-style>
              </ol-vector-layer>
              <ol-vector-layer :z-index="3"> 
                <ol-source-vector
                  v-if="showPredLayer"
                  ref="historyRouteIconVector"
                  :projection="projection"
                  :zoom="zoom"
                />
      
                <ol-style>
                  <ol-style-stroke
                    color="rgba(64, 71, 173, 0.98)"
                    :width="8"
                  />
                  <ol-style-fill color="rgba(255,255,255,0.1)" />
                  <ol-style-circle :radius="10">
                    <ol-style-fill color="blue" />
                  </ol-style-circle>
                  <ol-style-icon
                    :src="blueCarPlaceholder"
                    :scale="0.09"
                    :anchor="[0.5, 1]"
                  />  
                </ol-style>
              </ol-vector-layer>

              
              <ol-heatmap-layer 
                v-if="showTrafficLayer"
                :z-index="0"
                :blur="8"
                :radius="8"
                :weight="heatmapWeight"
              >
                <ol-source-vector

                  ref="trafficSource"
                />
              </ol-heatmap-layer>
              
              <ol-animated-clusterlayer
                v-if="showIncidentLayer"
                :z-index="1"
                :animation-duration="500"
                :distance="0"
              >
                <ol-source-vector ref="congestionSource" />
          
                <ol-style>
                  <ol-style-icon
                    :src="congestionIcon"
                    :scale="0.08"
                  />
                </ol-style>
              </ol-animated-clusterlayer>
              <ol-animated-clusterlayer
                v-if="showIncidentLayer"
                :z-index="1"
                :animation-duration="500"
                :distance="0"
              >
                <ol-source-vector ref="roadClosureSource" />
          
                <ol-style>
                  <ol-style-icon
                    :src="constructionIcon"
                    :scale="0.08"
                  />
                </ol-style>
              </ol-animated-clusterlayer>
              <ol-animated-clusterlayer
                v-if="showIncidentLayer"
                :z-index="1"
                :animation-duration="500"
                :distance="0"
              >
                <ol-source-vector ref="crashSource" />
          
                <ol-style>
                  <ol-style-icon
                    :src="crashIcon"
                    :scale="0.08"
                  />
                </ol-style>
              </ol-animated-clusterlayer>
            </ol-geolocation>
          </ol-map>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row> 
    <v-col
      cols="12"
      md="5"
      sm="12"
    >
      <v-card style="height:100%;">
        <VCardItem>
          <VCardTitle>Layers Control</VCardTitle>
        </VCardItem>
    
        <VCardText>
          <VRow
            justify="center"
            aling="center"
          >
            <VCol
              cols="12" 
              md="3"
              sm="12"
              class="d-flex align-center justify-center "
            >
              <v-switch
                v-model="enabledLayers"
                  
                color="primary"
                label="Routing"
                value="route"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="12"
              class="d-flex align-center justify-center "
            >
              <v-switch
                v-model="enabledLayers"
                  
                color="success"
                label="Traffic"
                value="traffic"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="12"
              class="d-flex align-center justify-center "
            >
              <v-switch
                v-model="enabledLayers"
            
                color="error"
                label="History"
                value="prediction"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="12"
              class="d-flex align-center justify-center "
            >
              <v-switch
                v-model="enabledLayers"
                
                color="#EF6C00"
                label="Incidents"
                value="incidents"
                hide-details
              />
            </VCol>
         
            <!-- </div> -->
          </VRow>
          <VRow>
            <VCol>
              <div class="d-flex align-center justify-center">
                <v-btn
                  variant="outlined"
                  @click="clearLayers"
                >
                  Clear all layers
                </v-btn>
              </div>
            </VCol>
          </VRow>
        </VCardText>  
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="7"
      sm="12"
    >
      <v-card style="height:100%;">
        <v-progress-linear
          v-if="isTrafficLoading"
          indeterminate
          color="success"
        />

        <VCardItem>
          <VCardTitle>Traffic time control</VCardTitle>
        </VCardItem>
        <VRow
          justify="center"
          align="center"
        >
          <VCol
            cols="12"
            md="9"
            sm="7"
          >
            <v-slider
              v-model="trafficSlider"
              class="ml-5"
              color="success"
              :min="0.0"
              :max="23.0"
              :step="1.0"
              thumb-label="always"
            >
              <template #thumb-label="{ modelValue }">
                {{ modelValue.toFixed(0) + ":00" }}
              </template>
            </v-slider>
          </VCol>
          <VCol
            cols="12"
            md="3"
            sm="5"
          >
            <v-select
              v-model="trafficDay"
              density="compact"
              class="ml-5 mr-5"
              label="Day"
              :items="[ 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']"
              variant="outlined"
            />
          </VCol>
        </VRow>
        <VRow
          class="mt-2"
          justify="center"
          align="center"
        >
          <p class="font-weight-bold">
            Traffic load level:
          </p>
          <VCol cols="3">
            <v-sheet
              class=" text-center mx-auto"
              elevation="5"

              border

              rounded="xl"
              :height="20"
              :width="20"
              color="rgba(0, 255, 43, 1)"
            />
            <p class="d-flex justify-center align-center">
              Low
            </p>
          </VCol>
          <VCol cols="3">
            <v-sheet
              class=" text-center mx-auto"
              elevation="5"
              border

              rounded="xl"
              :height="20"
              :width="20"
              color="rgba(251, 255, 0, 1)"
            />
            <p class="d-flex justify-center align-center">
              Medium
            </p>
          </VCol>
          <VCol cols="3">
            <v-sheet
              class=" text-center mx-auto "
              elevation="5"
              border
              rounded="xl"
              :height="20"
              :width="20"
              color="rgba(255, 0, 0, 1)"
            />
            <p class="d-flex justify-center align-center">
              High
            </p>
          </VCol>
        </VRow>
      </v-card>
    </v-col>
  </v-row>
  <streetInfo
    :is-dialog-enabled="modalStreetInfo"
    :coordinates="clusterSelecterCoordinates"
    @refreshIncidents="createIncidentFeatures"
    @closeDialog="modalClosed"
  />
</template>

<script setup>
import redBusPlaceholder from '@/assets/images/map/markers/red-bus-placeholder.png'
import redCarPlaceholder from '@/assets/images/map/markers/red-car-placeholder.png'
import redMapPlaceholder from '@/assets/images/map/markers/red-map-placeholder.png'
import taxiPlaceholder from '@/assets/images/map/markers/taxi-placeholder.png'
import mapImage from '@/assets/images/map/markers/map-logo.png'
import blueCarPlaceholder from '@/assets/images/map/markers/blue-car-placeholder.png'
import congestionIcon from '@/assets/images/map/report/congestion.png'
import constructionIcon from '@/assets/images/map/report/construction.png'
import crashIcon from '@/assets/images/map/report/crash.png'


import streetInfo from "@/views/modal/streetInfo.vue"
import CarTypeList from "../views/cars/carList.vue"
import tokenService from "../api/token.service"
import { toast } from "vue3-toastify"
import router from "../router/index"

import { ref, inject , onMounted, onBeforeMount } from "vue"


import {getCar, getGuids, getTrafficCongestion, getIncidents} from '../api/map.service' 
import {createPointFeature, getCoordinateAtIndex, countCoordinates} from '../utils/map.utils'



const url_osrm_route = '//router.project-osrm.org/route/v1/driving/'

const slideBarFlag = ref(false)
const isRouteVectorSource = ref(true)
const isHistoryRouteVectorSource = ref(true)
const historySlider = ref(0)
const trafficSlider = ref(0)
const maxHistorySlider = ref(0 )
const view = ref(null)
const map = ref(null) 
const geoLocChange = ref(null)

const guids = ref([],
)
const selectedCarTypeGuid=ref("")

const date = ref([new Date(), new Date()])
const historyCarListGenerated = ref(false)
const formatedDate = ref([])

const enabledLayers=ref(["prediction", "traffic", "route", "incidents"  ])
const showPredLayer = ref(true)
const showTrafficLayer = ref(true)
const showRouteLayer = ref(true)
const showIncidentLayer = ref(true)

const currentIconOfCar=ref(redCarPlaceholder)


const geom = inject('ol-geom')


const swipeControl=ref(null)

const clusterSelecterCoordinates=ref([])
const modalStreetInfo = ref(false)
let copyOfRouteLayer=null


const center = ref([71.41657224366838, 51.115236671774746])
const projection = ref("EPSG:4326")
const zoom = ref(12)
const rotation = ref(0)
const routeDrawedMarkers = ref({})
const drawEnable = ref(true)
const drawType = ref("Point")
const congestionSource = ref(null)

const routeVectors = ref(null)
const historyRouteIconVector = ref(null)
const historyRouteVectors = ref(null)
const trafficSource = ref(null) // traffic incidents
const roadClosureSource = ref(null) // road closure incidents
const crashSource = ref(null)  // crash incidents
const incidentFeatures=ref(null) // holds all the incidents
const clusterFeatures = ref(null) // Heatmap clusters of traffic congestion on map
let clusterDeepCopyFeatures=null // deep copy of heatmap
let clustersArray=[]
const trafficDay = ref('Mon') // current day
const routePoints = ref([] )
const carHistoryRouteInfo = ref([])

const isTrafficLoading = ref(true)

const format = inject("ol-format")
const feature = inject("ol-feature")


function modalClosed(){
  modalStreetInfo.value = false
}

const featureSelected = event => {
  clusterSelecterCoordinates.value=event.selected[0].getProperties().geometry.getCoordinates()
  modalStreetInfo.value = true
}



async function clearLayers(){
  enabledLayers.value = []
  showPredLayer.value = false
  showRouteLayer.value = false
  showTrafficLayer.value = false
}




async function onCarTypeSelect(guid) {
  historyCarListGenerated.value = true
  
  try{  
    if(historyRouteVectors.value !== undefined && historyRouteVectors.value !== null ){
      
      historyRouteIconVector.value.source.clear()
      historyRouteVectors.value.source.clear()
    }
    historySlider.value=0
    selectedCarTypeGuid.value = guid
    console.log(guid)
    await createRouteForCar(guid, formatedDate.value)
    historyCarListGenerated.value = false
  }catch(e){
    console.log(e)
    historyCarListGenerated.value = false
  }

}

async function resetTime(){
  const startDate = new Date('2020-12-08 17:00')
  const endDate = new Date('2020-12-08, 21:00')
  console.log(startDate)

  let formattedDates = [startDate, endDate  ].map(date => {
    let d = new Date(date)
    
    return `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}%20${('0' + d.getUTCHours()).slice(-2)}:${('0' + d.getUTCMinutes()).slice(-2)}:${('0' + d.getUTCSeconds()).slice(-2)}`
  })
  date.value = [startDate, endDate]
  formatedDate.value = formattedDates

  // console.log(date.value[0])
}
onBeforeMount(async () => {
  await resetTime()
  guids.value = await getGuids()
  await loadTrafficCongestion()
  
})
const heatmapWeight = function (feature) {
 
  const name = feature.get("load")
  const magnitude = parseFloat(name)
  
  return magnitude*0.06
}
async function loadTrafficCongestion(){
  clusterFeatures.value = await getTrafficCongestion('1')
  var feature =  new format.GeoJSON({
   
  }).readFeatures(clusterFeatures.value, {  
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:4326',
  })
  
  clusterDeepCopyFeatures = feature
  clustersArray.push(clusterDeepCopyFeatures)
  feature = feature.filter(feature => { 
    
    return feature.get('time') === 0},
  )

  // console.log("clusterFeatures:" , clusterDeepCopyFeatures)

  trafficSource.value.source.addFeatures(feature)
  await createIncidentFeatures()

  isTrafficLoading.value = false
  for(let i=2;i<8;i++){  
    const newTraffic = await getTrafficCongestion(i)
    var feature1 =  new format.GeoJSON({
   
    }).readFeatures(newTraffic, {  
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326',
    })
    clustersArray.push(feature1)

  }
} 

function getDayNumber(dayName) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
  const lowerCaseDayName = dayName.toLowerCase()
  
  for (let i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].toLowerCase() == lowerCaseDayName) {
      return i
    }
  }
  
  return -1 // Return -1 if the day name is not found
}



async function addIncidentFeatures(){
  congestionSource.value.source.addFeatures(incidentFeatures.value.filter(feature => feature.getProperties().comment === 'Congestion'))

  crashSource.value.source.addFeatures(incidentFeatures.value.filter(feature => feature.getProperties().comment === 'Crash'))

  roadClosureSource.value.source.addFeatures(incidentFeatures.value.filter(feature => feature.getProperties().comment === 'Road closure'))
}
async function createIncidentFeatures(){

  

  const startDate = new Date()

  // Get the date 3 hours before the current date
  const endDate = new Date(startDate.getTime() - 3 * 60 * 60 * 1000)

 
  let formattedDates = [startDate, endDate  ].map(date => {
    let d = new Date(date)
    
    return `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}%20${('0' + d.getUTCHours()).slice(-2)}:${('0' + d.getUTCMinutes()).slice(-2)}:${('0' + d.getUTCSeconds()).slice(-2)}`
  })
  var fetchedIncidents = await getIncidents(formattedDates)
  
  crashSource.value.source.clear()
  congestionSource.value.source.clear()
  roadClosureSource.value.source.clear()

  var answer = fetchedIncidents.map(item => {
    const coordinates = item.geometry.coordinates.map(parseFloat)
    
    return {
      type: 'Feature',
      properties: {
        id: item.id,
        datetime: item.datetime,
        comment: item.comment,
      },
      geometry: {
        type: 'Point',
        coordinates,
      },
    }
  })
  var fetchedIncidentsGeoJSON = new format.GeoJSON({

  }).readFeatures( {type: 'FeatureCollection',
    features: answer })
  incidentFeatures.value = fetchedIncidentsGeoJSON
  await addIncidentFeatures()

}


const drawstart = event => {
  var coord_street = event.feature.getGeometry().getCoordinates()
  console.log(coord_street)
  var last_point = routePoints.value[routePoints.value.length - 1]
  var points_length = routePoints.value.push(coord_street) 

  if(points_length == 1){
    return
  }

  // view.value.animate({center: [coord_street[0], coord_street[1]]})

  var point1 = last_point.join()
  var point2 = coord_street.join()
  fetch(url_osrm_route + point1 + ';' + point2).then(function(r) { 
    return r.json()
  }).then(function(json) {
    // console.log(json.routes[0])
    createRoute(json.routes[0].geometry)
  })

}



function createRoute(polyline) {
  var route = new format.Polyline({
    factor: 1e5,
  }).readGeometry(polyline, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:4326',
  })
  var featureRoute = new feature({
    type: 'Feature',
    geometry: route,
  })

  // console.log( featureRoute)
  routeVectors.value.source.addFeature(featureRoute)
}

async function createRouteForCar(guid, date) {
  try{
    const {rawJson, carGeoJson}= await getCar(guid, date)
    if( Object.keys(rawJson).length === 0){
      toast.error("History is not found for this car with provided dates")   
      
      return 
    }
    console.log(carGeoJson.features[0].geometry)
    const point = await createPointFeature(carGeoJson.features[0].geometry.coordinates[0][0])
    console.log('pooint', point)
    var route = new format.GeoJSON({
      id: 'historyRoute',
    }).readFeatures(carGeoJson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326',
    })
    var iconFeature =  new format.GeoJSON({
      id:'historyRouteIcon',  
    }).readFeatures(point, {  
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:4326',
    })
  
    iconFeature[0].setId('historyRouteIcon')
    route[0].setId('historyRoute')


    // adding a feature to the vector layer source with history
    historyRouteIconVector.value.source.addFeature(iconFeature[0])
    historyRouteVectors.value.source.addFeatures(route)
    const featureT = historyRouteIconVector.value.source.getFeatureById('historyRouteIcon')

    var newGeometry = new  geom.Point(point)

    console.log('newGeom: ', newGeometry)
    featureT.setGeometry(newGeometry)
    historyRouteIconVector.value.source.changed()

    // changing the max value of the slider to the number of points in the route
    // console.log(carGeoJson.features[0].geometry.coordinates[0].length)

    // set History info from feature about time and so on 
    carHistoryRouteInfo.value = carGeoJson
    maxHistorySlider.value = await countCoordinates(carGeoJson)
    toast.success("Predicted route has been created.")   
  } catch(e){
    toast.error("You must have been logged out. Please login again.")   

    // setTimeout(() => {
    //   tokenService.removeUser()
    //   router.push("/login").then(() => {
    //     router.go()
    //   })
    // }, 500)
    
  }
  

}

// subscribe to changes of the date hence formate the date and save it into formatedDate
watch(date, newDate => {
  let formattedDates = newDate.map(date => {
    let d = new Date(date)
    
    return `${d.getUTCFullYear()}-${('0' + (d.getUTCMonth() + 1)).slice(-2)}-${('0' + d.getUTCDate()).slice(-2)}%20${('0' + d.getUTCHours()).slice(-2)}:${('0' + d.getUTCMinutes()).slice(-2)}:${('0' + d.getUTCSeconds()).slice(-2)}`
  })
  formatedDate.value = formattedDates
  console.log(formatedDate.value)
})

// Subscribe to changes of the history slider 
watch(historySlider, currentIndex =>{
  const coordinates = getCoordinateAtIndex(carHistoryRouteInfo.value, currentIndex)


  const feature = historyRouteIconVector.value.source.getFeatureById('historyRouteIcon')
  var newGeometry = new  geom.Point(coordinates)
  feature.setGeometry(newGeometry)
  historyRouteIconVector.value.source.changed()

  // view.value.animate({center: [coordinates[0], coordinates[1]]})



})

// Subscribe to changes of the hour chosen by user
watch(trafficSlider, currentIndex =>{
  trafficSource.value.source.clear()
  const feature = clusterDeepCopyFeatures
  const filteredFeature = feature.filter(feature => { 
    
    return feature.get('time') === currentIndex},
  )
 
 
  trafficSource.value.source.addFeatures(filteredFeature)
  trafficSource.value.source.changed()

  
// Subscribe to changes of the day chosen by the user
})
watch(trafficDay, newDay => {
  // console.log(newDay)
  trafficSource.value.source.clear()
  let day= getDayNumber(newDay)
  clusterDeepCopyFeatures =  clustersArray[day]

  const feature = clustersArray[day].filter(feature => { 
    
    return feature.get('time') === trafficSlider.value},
  )
  trafficSource.value.source.addFeatures(feature)

  // console.log(feature)
})

// Subscribe to changes of the enabled layers and do something on add or delete
watch(enabledLayers, (newArray, oldArray) => {
  // Check if a value was added
  if (newArray.length > oldArray.length) {
    const addedValue = newArray[newArray.length - 1]

    // Call a function for adding a value
    if(addedValue == 'prediction'){
      showPredLayer.value = true
    }
    else if(addedValue == 'traffic'){
      showTrafficLayer.value = true

      setTimeout(() => {
       
        var features = clusterDeepCopyFeatures
        features = features.filter(feature => { 
    
          return feature.get('time') === trafficSlider.value},
        )
        trafficSource.value.source.addFeatures(features)
        trafficSource.value.source.changed()
      }, 50 )
   
    }
    else if(addedValue == 'route'){
      showRouteLayer.value = true   

    }else if(addedValue == 'incidents'){
      showIncidentLayer.value = true   
      setTimeout(() => {
       
        addIncidentFeatures()
      }, 50 )
    }
  }

  // Check if a value was deleted
  else if (newArray.length < oldArray.length) {
    const deletedValue = oldArray.find(value => !newArray.includes(value))

    // Call a function for deleting a value
    if(deletedValue == 'prediction'){
      showPredLayer.value = false
      historySlider.value = 0
    }
    else if(deletedValue == 'traffic'){
      showTrafficLayer.value = false

    }
    else if(deletedValue == 'route'){
      copyOfRouteLayer = routeVectors.value.source
      console.log(copyOfRouteLayer)
      showRouteLayer.value = false 
      console.log(copyOfRouteLayer)
      routeVectors.value = copyOfRouteLayer
      console.log(routeVectors.value)
      routePoints.value=[]

    } else if(deletedValue == 'incidents'){
      showIncidentLayer.value = false   

    }
  }
})
</script>


<style>
.ol-zoom {

  order: 1; /* adjust as needed */
  margin: 0.5em; /* adjust as needed */
}
.ol-zoom button {
  width: 30px;
  height: 30px;
 
  font-size: 1.5vh;
}
.ol-scaleline {
  width: 10vh;
  height: 10vh;
  order: 2; /* adjust as needed */
  margin: 0.5em; /* adjust as needed */
}
.ol-scaleline button{
  width: 10vh;
  height: 10vh;
  font-size: 1.5vh;
}
</style>