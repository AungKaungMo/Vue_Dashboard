import { HTTP } from '@/services/api-service'

/***************************************************
           GET ALL ROLES 
**************************************************/
const roleRoute = 'v1/roles'
export async function getAllRoles(pageId, rows) {
  let route = roleRoute
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
           CREATE NEW ROLE
**************************************************/
export async function createRole(payload) {
  try {
    const { data } = await HTTP.post(roleRoute, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           GET ROLE BY ROLE ID 
**************************************************/
export async function getDetailRole(id) {
  try {
    const { data } = await HTTP.get(`${roleRoute}/${id}`)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           UPDATE ROLE BY ROLE ID 
**************************************************/
export async function updateRole(payload, id) {
  try {
    const { data } = await HTTP.put(`${roleRoute}/${id}`, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
