import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'
import { userRoutes } from './user'
import DashboardLayout from '@/layouts/dashboard/DashboardLayout.vue'
import PageNotFound from '@/screens/page-not-found/index.vue'

const routes = [
  /***************************************************
           ADMIN ROUTES 
**************************************************/
  {
    path: '/',
    component: DashboardLayout,
    requireAuth: true,
    children: [...userRoutes]
  },
  /***************************************************
           AUTHENTICATION ROUTES 
**************************************************/
  {
    path: '/',
    children: [...authRoutes]
  },
  /***************************************************
           PAGE NOT FOUND ROUTES 
**************************************************/
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound
  }
]

/***************************************************
           CREATING BROWSER ROUTER 
**************************************************/
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
