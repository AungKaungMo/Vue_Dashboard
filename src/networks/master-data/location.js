import { HTTP } from '@/services/api-service'

/***************************************************
           GET ALL LOCATIONS 
**************************************************/
const locationRoute = 'v1/locations'

export async function getAllLocation(pageId, rows, key = null, trashed) {
  let route = locationRoute
  if (pageId) {
    route += `?page=${pageId}`
  }
  if (rows) {
    route += `&per_page=${rows}`
  }
  if (key) {
    route += `&key=${key}` // to get all list without parent child structure
  }

  if (trashed) {
    route += `&trashed=${trashed}`
  }

  try {
    const { data } = await HTTP.get(route)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           CREATE NEW LOCATIONS
**************************************************/
export async function createLocation(payload) {
  try {
    const { data } = await HTTP.post(locationRoute, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           GET LOCATIONS BY LOCATIONS ID 
**************************************************/
export async function getDetailLocation(id) {
  try {
    const { data } = await HTTP.get(`${locationRoute}/${id}`)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           UPDATE LOCATIONS BY LOCATIONS ID 
**************************************************/
export async function updateLocation(payload, id) {
  try {
    const { data } = await HTTP.put(`${locationRoute}/${id}`, payload)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/********************************************************
           DELETE LOCATION BY LOCATION ID 
******************************************************/
export async function deleteLocation(id) {
  try {
    const { data } = await HTTP.delete(`${locationRoute}/${id}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/********************************************************
          PERMANENT DELETE LOCATION BY LOCATION ID 
******************************************************/
export async function permanentDeleteLocation(id) {
  try {
    const { data } = await HTTP.delete(`v1/locations/permanent-delete/${id}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/********************************************************
          UNARCHIVE LOCATION BY LOCATION ID 
******************************************************/
export async function unarchiveLocation(id) {
  try {
    const { data } = await HTTP.put(`v1/locations/unarchive/${id}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
