const TOKEN_KEY = 'jwtToken'
const USER = 'user'

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setUser = (user_name) => {
  localStorage.setItem(USER, user_name)
}

export const removeUser = () => {
  localStorage.removeItem(USER)
}
export const getUser = () => {  
  return localStorage.getItem(USER)
}