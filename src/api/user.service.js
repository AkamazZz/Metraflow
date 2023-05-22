import api from "./api"


export async function getUserInfo() {
  try {
    const response = await api.get(`/users/me/`)
    console.log(response.data)
    
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || error.message)
  }
}