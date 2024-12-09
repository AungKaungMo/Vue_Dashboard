<!----------------------------------------------------
      THIS COMPONENT IS FOR LAYOUT HEADER BAR  
----------------------------------------------------->
<script setup>
import {
  HumburgerMenu,
  // Mon, Sun,
  Person,
  FullScreenEnter,
  FullScreenExit
} from '@/assets/icons'
import ChangePassword from './ChangePassword.vue'
import { useDashboardLayoutStore } from '@/stores/dashboardLayout'
import Menu from 'primevue/menu'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { logOut } from '@/networks/user-management/user'
import { errorToast, successToast } from '@/utils/toast-alert'
import { useToast } from 'primevue/usetoast'
import router from '@/routes'

const visible = ref(false)
const dashboardLayout = useDashboardLayoutStore()
const menu = ref()
const auth = useAuthStore()
const toast = useToast()

const enterFullScreen = ref(false)
const myDocument = document.documentElement

const items = ref([
  {
    label: auth.userName || 'Anonymous',
    items: [
      {
        label: 'Change Password',
        icon: 'pi pi-key',
        command: () => {
          visible.value = true
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: async () => {
          const [error, data] = await logOut()
          if (error) {
            errorToast(toast)
          } else if (data.status) {
            auth.logout()
            router.push({ name: 'login' })
            successToast(toast, 'Successfully logged out.')
          }
        }
      }
    ]
  }
])

/***************************************************
           HANDLING CHANGE PASSWORD POP UP BOX 
**************************************************/
const changeVisibleValue = () => {
  visible.value = false
}

/***************************************************
           VIEWING WITH WIDE FULL SCREEN 
**************************************************/
const getFullScreen = () => {
  enterFullScreen.value = !enterFullScreen.value
  if (enterFullScreen.value) {
    enterScreen()
  } else {
    exitScreen()
  }
}

/***************************************************
           ENTERING TO FULL SCREEN 
**************************************************/
function enterScreen() {
  if (myDocument.requestFullScreen) {
    myDocument.requestFullScreen()
  } else if (myDocument.msRequestFullScreen) {
    myDocument.msRequestFullScreen()
  } else if (myDocument.mozRequestFullScreen) {
    myDocument.mozRequestFullScreen()
  } else if (myDocument.webkitRequestFullScreen) {
    myDocument.webkitRequestFullScreen()
  }
}

/***************************************************
           EXISTING FROM FULL SCREEN 
**************************************************/
function exitScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExistFullScreen) {
    document.msExistFullScreen()
  } else if (document.mozExistFullScreen) {
    document.mozExistFullScreen()
  } else if (document.webkitExistFullScreen) {
    document.webkitExistFullScreen()
  }
}

/***************************************************
           TOGGLING SIDEBAR   
**************************************************/
const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <section
    :class="`bg-primaryBgColor w-full h-20 flex fixed top-0 right-0 z-50 justify-between pl-7 pr-8 items-center transition-all duration-150 border-b ${!dashboardLayout.isMenuOpen ? 'header' : 'header-responsive'}`"
  >
    <div>
      <HumburgerMenu
        @click="dashboardLayout.setMenuOpen()"
        class="text-3xl cursor-pointer hover:opacity-70 transition-all duration-150"
      />
    </div>

    <div class="flex items-center gap-7">
      <FullScreenEnter
        class="text-2xl cursor-pointer hover:text-secondaryColor transition-all duration-150"
        v-if="!enterFullScreen"
        @click="getFullScreen()"
      />
      <FullScreenExit
        class="text-2xl cursor-pointer hover:text-secondaryColor transition-all duration-150"
        @click="getFullScreen()"
        v-else
      />

      <div class="flex items-center">
        <Button unstyled @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
          <Person
            class="text-3xl cursor-pointer hover:text-secondaryColor transition-all duration-150"
          />
        </Button>

        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </section>
  <ChangePassword :visible="visible" @changeVisible="changeVisibleValue" />
</template>
<style scoped>
.header {
  width: calc(100% - 280px);
}
.header-responsive {
  width: calc(100% - 90px);
}
</style>
