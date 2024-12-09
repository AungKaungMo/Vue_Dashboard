import { defineStore } from 'pinia'
import { ref } from 'vue'

/***************************************************
        HANDLING ACTIONS FOR DASHBOARD LAYOUT
**************************************************/
export const useDashboardLayoutStore = defineStore('dashboardLayout', () => {
  const isMenuOpen = ref(false)
  const isDarkTheme = ref(false)

  /***************************************************
        GETTING SIDEBAR MENU STATUS 
**************************************************/
  const getMenuOpen = () => {
    return isMenuOpen.value
  }

  /***************************************************
         SETTING SIDEBAR MENU STATUS
**************************************************/
  const setMenuOpen = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  /***************************************************
         SETTING TOGGLE THEME 
**************************************************/
  const setTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
  }

  return { isMenuOpen, isDarkTheme, setMenuOpen, getMenuOpen, setTheme }
})
