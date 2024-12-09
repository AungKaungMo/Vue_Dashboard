<script setup>
import { useDashboardLayoutStore } from '@/stores/dashboardLayout'
// import Logo from '@/assets/images/doctorlogo.png'
import SidebarItem from './SidebarItem.vue'
import SidebarCollapse from './SidebarCollapse.vue'
import SideNavbar from '@/menus'
const dashboardLayout = useDashboardLayoutStore()
</script>

<template>
  <section
    :class="`fixed overflow-y-auto bg-white top-0 left-0 h-full transition-all duration-200 ${dashboardLayout.isMenuOpen ? 'w-[90px]' : 'w-[280px]'}`"
  >
    <div class="flex items-center gap-2 text-2xl justify-center h-20 border-r text-secondaryColor">
      <!-- <img :src="Logo" class="w-16 h-16" /> -->
      <img
        src="@/assets/images/logo.png"
        :class="!dashboardLayout.isMenuOpen ? 'h-14' : 'h-8'"
      />
      <!-- <img
        src="@/assets/images/logo.png"
        :class="!dashboardLayout.isMenuOpen ? 'h-14' : 'h-8'"
      /> -->

      <!-- <p class="font-bold select-none" v-if="!dashboardLayout.isMenuOpen">LOGO</p> -->
    </div>
    <hr />

    <ul class="my-4 px-6" v-if="!dashboardLayout.isMenuOpen">
      <template v-for="(item, index) in SideNavbar" :key="index">
        <SidebarItem :item="item" />
      </template>
    </ul>

    <ul class="mt-5 flex flex-col items-center justify-center" v-if="dashboardLayout.isMenuOpen">
      <template v-for="(item, index) in SideNavbar" :key="index">
        <SidebarCollapse :item="item" />
      </template>
    </ul>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 30px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
