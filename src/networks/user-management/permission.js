import { HTTP } from '@/services/api-service'

/***************************************************
           GET ALL PERMISSIONS 
**************************************************/
export async function getAllPermissions() {
  try {
    const { data } = await HTTP.get('v1/permissions')
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           GET PERMISSION DETAIL BY PERMISSION ID 
**************************************************/
export async function getPermissionDetail(id) {
  try {
    const { data } = await HTTP.get(`v1/permissions/${id}`)
    return [null, data?.data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           CREATE NEW PERMISSION 
**************************************************/
export async function createPermission(permission) {
  try {
    const { data } = await HTTP.post('v1/permissions', {
      name: permission
    })
    return [null, data]
  } catch (error) {
    return [error]
  }
}

/***************************************************
           UPDATE PERMISSION BY ROLE ID 
**************************************************/
export async function updatePermission(permission, id) {
  try {
    const { data } = await HTTP.put(`v1/permissions/${id}`, {
      name: permission
    })
    return [null, data]
  } catch (error) {
    return [error]
  }
}
