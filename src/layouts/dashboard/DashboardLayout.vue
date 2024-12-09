<script setup>
import { useDashboardLayoutStore } from '@/stores/dashboardLayout'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
const dashboardLayout = useDashboardLayoutStore()
</script>

<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <div
    :class="`mt-[7em] mb-[4em] ms-auto pl-8 ${!dashboardLayout.isMenuOpen ? 'content' : 'content-responsive'}`"
  >
    <router-view></router-view>
  </div>
</template>
<style scoped>
/**********************************************************
           TO GET CERTAIN WIDTH WHEN TOGGLE SIDEBAR 
*********************************************************/
.content {
  width: calc(100% - 280px);
}
.content-responsive {
  width: calc(100% - 90px);
}
</style>
