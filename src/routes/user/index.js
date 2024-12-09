/***************************************************
           ADMIN USER ROUTES 
**************************************************/
export const userRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requireRoles: true,
      // permissions: ['dashboard-list']
      roles: ['developer']
    },
    component: () => import('@/screens/admin/dashboard/index.vue')
  },

  /***************************************************
           LOCATIONS 
**************************************************/
  {
    path: '/master-data/locations',
    name: 'master-data-locations',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/master-data/location/index.vue')
  },
  {
    path: '/master-data/locations/new',
    name: 'master-data-locations-new',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/master-data/location/create.vue')
  },
  {
    path: '/master-data/locations/:id/edit',
    name: 'master-data-locations-edit',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/master-data/location/edit.vue')
  },

  /***************************************************
           USER ROUTES 
**************************************************/
  {
    path: '/user-management/user',
    name: 'user-management-user',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/user-management/index.vue')
  },
  {
    path: '/user-management/user/new',
    name: 'user-management-user-new',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/user-management/create.vue')
  },
  {
    path: '/user-management/user/:id/edit',
    name: 'user-management-user-edit',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/user-management/edit.vue')
  },
  /***************************************************
           ROLE ROUTES 
**************************************************/
  {
    path: '/user-management/role',
    name: 'user-management-role',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/role-management/index.vue')
  },
  {
    path: '/user-management/role/new',
    name: 'user-management-role-new',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/role-management/create.vue')
  },
  {
    path: '/user-management/role/:id/edit',
    name: 'user-management-role-edit',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/role-management/edit.vue')
  },

  /***************************************************
           PERMISSION ROUTES 
**************************************************/
  {
    path: '/user-management/permission',
    name: 'user-management-permission',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/permission-management/index.vue')
  },
  {
    path: '/user-management/permission/new',
    name: 'user-management-permission-new',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/permission-management/create.vue')
  },
  {
    path: '/user-management/permission/:id/edit',
    name: 'user-management-permission-edit',
    meta: {
      requireRoles: true,
      roles: ['developer']
    },
    component: () => import('@/screens/admin/user/permission-management/edit.vue')
  }

]
