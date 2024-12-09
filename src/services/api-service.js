import axios from 'axios'
import router from '../routes'
import { useAuthStore } from '@/stores/auth'
const http = axios.create()

/*********************************************************
       ADDING CONFIGURATION TO REUSE AXIOS API CALL 
**********************************************************/
http.interceptors.request.use(
  function (config) {
    const store = useAuthStore()
    config.baseURL = import.meta.env.VITE_APP_BASE_URL
    config.headers.Authorization = 'Bearer ' + store.access_token
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data' //FOR IMAGE UPLOADING
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  function error() {
    return Promise.reject(error)
  }
)

/********************************************************
       CHECKING USER IS UNAUTHORIZED
*********************************************************/
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status == 401 || error.response?.status == 403) {
      const authStore = useAuthStore()
      authStore.$reset()

      if (error?.response?.status === 404) {
        router.push({ name: 'not-found' })
      }
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export const HTTP = http
