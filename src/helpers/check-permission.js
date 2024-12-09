import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

/******************************************************
           CHECK CURRENT USER IS SUPERADMIN OR NOT
******************************************************/
const isSuperAdmin = computed(() => {
  const store = useAuthStore()
  return store.role.includes('Super Admin')
})

/*****************************************************************
           CHECK CURRENT USER HAS PERMISSIONS OR IS SUPERADMIN
*****************************************************************/
// export function hasPermissions(permissions) {
//   const store = useAuthStore()
//   if (!store.permissions.length) {
//     return false
//   }
//   const permissionArray = permissions.filter((permission) => {
//     return store.permissions.includes(permission)
//   })
//   return permissionArray.length > 0 || isSuperAdmin.value
// }

/***************************************************
           CHECK CURRENT USER HAS ROLE
**************************************************/
export function hasRole(roles) {
  const store = useAuthStore()
  if (!store.role.length) {
    return false
  }

  const roleArray = roles.filter((role) => {
    return store.role.includes(role)
  })

  return roleArray.length > 0 || isSuperAdmin.value
}
