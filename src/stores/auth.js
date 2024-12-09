import { defineStore } from 'pinia'
import { HTTP } from '@/services/api-service'

/***************************************************
      STORING CURRENT USER DATA  
**************************************************/
export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: '',
    role: [],
    permissions: [],
    userId: null,
    userName: '',
    userEmail: ''
  }),
  getters: {
    getToken(state) {
      return state.access_token
    },
    getName(state) {
      return state.userName
    },
    getEmail(state) {
      return state.userEmail
    },
    getUserId(state) {
      return state.user.id
    }
  },
  actions: {
    /***************************************************
      USER LOGIN 
**************************************************/
    login(payload) {
      return new Promise((resolve, reject) => {
        HTTP.post('v1/login', payload)
          .then((res) => {
            if (res.data && res.data.data) {
              this.access_token = res.data.data.token
              this.userId = res.data.data.id
              this.role = res.data.data.role || []
              this.userName = res.data.data.name
              resolve(res.data)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /***************************************************
      USER LOGOUT 
**************************************************/
    logout() {
      return this.$reset()
    }
  },
  /***************************************************
      ADDING USER DATA TO LOCALSTORAGE
**************************************************/
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userId', 'userName', 'access_token', 'role']
      }
    ]
  }
})
