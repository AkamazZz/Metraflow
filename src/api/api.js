import axios from "axios"
import tokenService from "./token.service"

const token = tokenService.getLocalAccessToken()

const headers = {
  "Content-Type": "application/json",
}

if (token) {
  headers.Authorization = `Bearer ${token}`
}

const instance = axios.create({
  baseURL: "http://34.118.42.3:8000/api/v1",
  headers: headers,
  withCredentials: true,
  timeout: 10000,
})



export default instance