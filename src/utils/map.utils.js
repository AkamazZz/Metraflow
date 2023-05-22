export async function countCoordinates(geojson) {
  let count = 0
  
  // Iterate through each feature in the feature collection
  geojson.features.forEach(feature => {
    // Only consider features of type "MultiLineString"
    if (feature.geometry.type === "MultiLineString") {
      // Iterate through each line in the MultiLineString
      feature.geometry.coordinates.forEach(line => {
        // Add the number of coordinates in the line to the count
        count += line.length
      })
    }
  })
  
  return count
}

export function getCoordinateAtIndex(geojson, index) {
  let coordinates = []
  let count=0

  // Iterate through each feature in the feature collection
  // Iterate through each feature in the feature collection
  for (let i = 0; i < geojson.features.length; i++) {
    const feature = geojson.features[i]
  
    // Only consider features of type "MultiLineString"
    if (feature.geometry.type === "MultiLineString") {
    // Iterate through each line in the MultiLineString
      for (let j = 0; j < feature.geometry.coordinates.length; j++) {
        const line = feature.geometry.coordinates[j]
      
        // Iterate through each coordinate in the line
        for (let k = 0; k < line.length; k++) {
          const coordinate = line[k]
        
          if (count != index) {
            count++
          } else if (count === index) {
            return coordinate
          }
        }
      }
    }
  }
  
  // Return the coordinate at the specified index
  return []
}
export async function createPointFeature(lat, lng) {
  const feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
  }
    
  return {
    type: "FeatureCollection",
    features: [feature],
  }
}

export function decodeToGeoJSON(geometry) {
  var encodedPolyline = geometry
  
  return polyline.toGeoJSON(encodedPolyline)
}

var polyline = {}

function encode(current, previous, factor) {
  current = Math.round(current * factor)
  previous = Math.round(previous * factor)
  var coordinate = current - previous
  coordinate <<= 1
  if (current - previous < 0) {
    coordinate = ~coordinate
  }
  var output = ''
  while (coordinate >= 0x20) {
    output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63)
    coordinate >>= 5
  }
  output += String.fromCharCode(coordinate + 63)
  
  return output
}

/**
 * Decodes to a [latitude, longitude] coordinates array.
 *
 * This is adapted from the implementation in Project-OSRM.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Array}
 *
 * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */
polyline.decode = function(str, precision) {
  var index = 0,
    lat = 0,
    lng = 0,
    coordinates = [],
    shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, precision || 5)

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {

    // Reset shift, result, and byte
    byte = null
    shift = 0
    result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1))

    shift = result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1))

    lat += latitude_change
    lng += longitude_change

    coordinates.push([lat / factor, lng / factor])
  }

  return coordinates
}

/**
 * Encodes the given [latitude, longitude] coordinates array.
 *
 * @param {Array.<Array.<Number>>} coordinates
 * @param {Number} precision
 * @returns {String}
 */
polyline.encode = function(coordinates, precision) {
  if (!coordinates.length) {
    return ''
  }

  var factor = Math.pow(10, precision || 5),
    output = encode(coordinates[0][0], 0, factor) + encode(coordinates[0][1], 0, factor)

  for (var i = 1; i < coordinates.length; i++) {
    var a = coordinates[i],
      b = coordinates[i - 1]
    output += encode(a[0], b[0], factor)
    output += encode(a[1], b[1], factor)
  }

  return output
}

function flipped(coords) {
  var flipped = []
  for (var i = 0; i < coords.length; i++) {
    flipped.push(coords[i].slice().reverse())
  }
  
  return flipped
}

/**
 * Encodes a GeoJSON LineString feature/geometry.
 *
 * @param {Object} geojson
 * @param {Number} precision
 * @returns {String}
 */
polyline.fromGeoJSON = function(geojson, precision) {
  if (geojson && geojson.type === 'Feature') {
    geojson = geojson.geometry
  }
  if (!geojson || geojson.type !== 'LineString') {
    throw new Error('Input must be a GeoJSON LineString')
  }
  
  return polyline.encode(flipped(geojson.coordinates), precision)
}

/**
 * Decodes to a GeoJSON LineString geometry.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Object}
 */
polyline.toGeoJSON = function(str, precision) {
  var coords = polyline.decode(str, precision)
  
  return {
    type: 'LineString',
    coordinates: flipped(coords),
  }
}

if (typeof module === 'object' && module.exports) {
  module.exports = polyline
}