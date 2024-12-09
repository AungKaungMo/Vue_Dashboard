import { HTTP } from '@/services/api-service'
import { useAuthStore } from '@/stores/auth'

/***************************************************
           GET ALL USERS 
**************************************************/

const userRoute = 'v1/users'

export async function getAllUsers(pageId, rows) {
  let route = userRoute
  if (pageId) {
    route += `?page=${pageId}`
  }
  if (rows) {
    route += `&per_page=${rows}`
  }
  try {
    const { data } = await HTTP.get(route)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           CREATE NEW USER 
**************************************************/
export async function createUser(payload) {
  try {
    const { data } = await HTTP.post(userRoute, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           GET USER DETAIL BY ID 
**************************************************/
export async function getDetailUser(id) {
  try {
    const { data } = await HTTP.get(`${userRoute}/${id}`)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           UPDATE USER BY USER ID
**************************************************/
export async function updateUser(payload, id) {
  try {
    const { data } = await HTTP.put(`${userRoute}/${id}`, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           CHANGE PASSWORD 
**************************************************/
export async function changePassword(payload) {
  try {
    const auth = useAuthStore()
    const { data } = await HTTP.post(`${userRoute}/change_password/${auth.userId}`, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           LOG OUT 
**************************************************/
export async function logOut() {
  try {
    const { data } = await HTTP.get('v1/logout')
    return [null, data]
  } catch (error) {
    return [error]
  }
}
