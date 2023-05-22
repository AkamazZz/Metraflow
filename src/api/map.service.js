
import axios from "axios"
import { decodeToGeoJSON } from "../utils/map.utils"
import api from "./api"

var polyline = import('@mapbox/polyline')
const url_osrm_route = '//router.project-osrm.org/route/v1/driving/'
export async function getGuids(){
  const response = await api.get('/cars/guids')
  console.log(response.data )
  
  return response.data
}


export async function addIncident(incident){
  return await api.post('/cars/incidents', incident)
}

export async function getIncidents(date){
  const response = await api.get(`/cars/incidents?sd=${date[1]}&ed=${date[0]}`)
  console.log(`/cars/incidents?sd=${date[0]}&ed=${date[1]}`)
  
  return response.data
}
export async function getTrafficCongestion(number){
  console.log("number: " , number)
  
  const response = await axios.get(`http://34.118.42.3:5000/road_loads_geojson?date=${number}`, {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Credentials':"*",
      'Access-Control-Allow-Origin':"*",
    },
    timeout: 10000,
  })
  console.log(response.data )
  
  return response.data
}
export async function getCar(guid, dates) {
  const gui = guid
  const date = dates
  console.log(`/cars?guid=${gui}&sd=${date[0]}&ed=${date[1]}`)
  const response = await api.get(`/cars?guid=${gui}&sd=${date[0]}&ed=${date[1]}`)

  // const response = await api.get('/cars?guid=712070869093788000&sd=2020-12-08%2011:17:00&ed=2020-12-09%2011:20:00')
 
  const geojson = {
    type: 'FeatureCollection',
    features: [],
  }

  var coordinates = []
  var prev=[]
  if(response.data.length > 0){
    for (var i = 0; i < response.data.length; i++) {
      console.log(prev)
      if(i>1){
        coordinates.push([parseFloat(prev[0]), parseFloat(prev[1])]  )
      }
      var point = response.data[i]
      console.log(point)

      // Add the latitude and longitude to the coordinate array
      coordinates.push([parseFloat(point.longitude), parseFloat(point.latitude)])
      console.log("I= " + i + "")
      console.log(point)
      if(coordinates.length == 2 ){
        var feature = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [],
          },
          properties: {
            startTime: response.data[i-1].datetime,
            endTime: response.data[i].datetime,
            guid: response.data[i].guid,
          },
        }
        const val = await getRouteFromApi(coordinates[0], coordinates[1])
        prev=coordinates[1]
        console.log(val.coordinates )
        feature.geometry.coordinates.push(val.coordinates)
        geojson.features.push(feature)
        coordinates = []
      } 
    
    
    }
  }else {
    return {rawJson: {}, carGeoJson: {}}
  }
  
  return {rawJson: response.data , carGeoJson: geojson}
}

export async function getRouteFromApi(point1, point2){
  console.log(url_osrm_route + point1 + ';' + point2)
  const response = await fetch(url_osrm_route + point1 + ';' + point2)
  const json = await response.json()  
  console.log(json)
  console.log(decodeToGeoJSON(json.routes[0].geometry))
  
  return decodeToGeoJSON(json.routes[0].geometry)
  
}


// export async function getCar() {
//   const response = await api.get('/cars?guid=712070869093788000&sd=2020-12-08%2011:17:00&ed=2020-12-09%2011:20:00')
 
//   const geojson = {
//     type: 'FeatureCollection',
//     features: [],
//   }

//   var coordinates = []
//   var feature = {
//     type: 'Feature',
//     geometry: {
//       type: 'MultiLineString',
//       coordinates: [],
//     },
//     properties: {
      
//     },
//   }
//   for (var i = 0; i < response.data.length; i++) {
//     var point = response.data[i]
  
//     // Add the latitude and longitude to the coordinate array
//     coordinates.push([parseFloat(point.longitude), parseFloat(point.latitude)])
  
//     if(i%2!=0){
//       const val = await getRouteFromApi(coordinates[0], coordinates[1])
      
//       coordinates = []
//     }
    
    
//   }
//   feature.geometry.coordinates.push(coordinates)
//   geojson.features.push(feature)


//   //   for (const item of response.data) {
//   //     const feature = {
//   //       type: 'Feature',
//   //       geometry: {
//   //         type: 'LineString',
//   //         coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
//   //       },
//   //       properties: {
//   //         guid: item.guid,
//   //         datetime: item.datetime,
//   //       },
//   //     }
//   //     geojson.features.push(feature)
//   //   }
//   //   console.log(geojson)
//   console.log(val)
  
//   return {rawJson: response.data , carGeoJson: geojson}
// }