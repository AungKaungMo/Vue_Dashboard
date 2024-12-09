/***************************************************
           AUTHENTICATION ROUTES 
**************************************************/
export const authRoutes = [
  {
    path: '/',
    redirect: '/login',
    meta: { isAuthRoute: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/screens/auth/Login.vue'),
    meta: { isAuthRoute: true }
  }
]
