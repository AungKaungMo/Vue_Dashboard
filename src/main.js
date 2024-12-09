import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './assets/css/index.css'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import router from './routes'
import App from './App.vue'
import piniaPersist from 'pinia-plugin-persist'
import ToastService from 'primevue/toastservice'
import Container from '@/components/Container.vue'
import { useAuthStore } from './stores/auth'
import { hasRole } from './helpers/check-permission'

const app = createApp(App)

app.use(createPinia().use(piniaPersist))

/****************************************************************
   TO USE PRIMEVUE COMPONENT FROM ANY COMPONENTS AND PAGES  
****************************************************************/
app.use(PrimeVue)
app.use(ToastService)
app.use(router)

/*******************************************************
   TO USE CONTAINER FROM ANY COMPONENTS AND PAGES
********************************************************/
app.use(Container)
app.mount('#app')

/***************************************************
    HANDLING BEFOR USER ENTERING ROUTES 
**************************************************/
router.beforeEach((to) => {
  window.scrollTo(0, 0)

  const authStore = useAuthStore()

  /********************************************************
     CHECKING NEED AUTHENTICATION IS REQUIRE AND HAS TOKEN
***********************************************************/
  if (to.meta.requireAuth && authStore.getToken == '') {
    return {
      path: '/login'
    }
  }

  /*****************************************************
      CHECING AUTHENTICATION IS REQUIRE AND HAS TOKEN
******************************************************/
  if (to.meta.isAuthRoute && authStore.getToken != '') return '/dashboard'

  /***************************************************
      CHECKING ROUTE PERMISSION IN USER PERMISSIONS
****************************************************/
  if (to.meta.requireRoles) {
    if (authStore.role.length == 0) {
      authStore.$reset()
      return {
        path: '/login'
      }
    }

    if (!hasRole(to.meta.roles)) {
      return {
        path: '/page-not-found'
      }
    }
  }
})
