import api from "./api"
import { default as TokenService, default as tokenService } from "./token.service"

// const API_URL = "http://localhost:3000"

/**
   * Login user and return JWT token and user object
   * @param {Object} credentials - User email and password
   * @returns {Promise<Object>} - JWT token and user object
   */
export async function login(credentials) {
  try { 
    
    const response = await api.post(`/jwt/create/`, credentials)
    console.log(response)
    if(response.status == 200){
      console.log(response.status)
      if(response.data.refresh && response.data.access){
        TokenService.setUser(response.data)
      }
    }
    else{
      throw "This user or password is not valid"
    }
    
    return response.data
  } catch (error) {
    console.log(error.response.data)

    // Check if error.response exists  before trying to access its properties
    if (error.response) {
      // throw new Error(error.response || error.message )
      console.log(error.response.data)
      
      throw error.response.data
    } else {
      
      throw error
    } 
  }
}

/**
 * Register user and return JWT token and user object
 * @param {Object} user - User name, email, and password
 * @returns {Promise<Object>} - JWT token and user object
 */
export async function register(user) {
  try {
    console.log(user)
    const response = await api.post(`/users/`, user)
    console.log(response)
    if(response.status != 201){
      throw "Not all fields are filled"  
    }

    return response.data
  } catch (error) {

    // Check if error.response exists  before trying to access its properties
    if (error.response) {
      // throw new Error(error.response || error.message )
      console.log(error.response.data)
      
      throw error.response.data
    } else {
      
      throw error
    } 
  }
}

/**
 * Verify JWT token and return user object
 * @param {String} token - JWT token
 * @returns {Promise<Object>} - User object
 */
export async function verify(token) {
  try {
    const response = await api.post(`/auth/verify`, { token })
    
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || error.message)
  }
}

export async function logout() {
  TokenService.removeUser()
}

export function setAuthHeader() {
  const token = tokenService.getLocalAccessToken()
  api.defaults.headers.common['Bearer'] = `${token}`
}

export function removeAuthHeader() {
  delete api.defaults.headers.common['token']
}

export function getLoggedInUser() {
  return api.get(`${API_URL}/me`)
}