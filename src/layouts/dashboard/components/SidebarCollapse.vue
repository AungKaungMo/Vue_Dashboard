<script setup>
import { hasRole } from '@/helpers/check-permission'
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
const props = defineProps({
  item: Object
})
const { item } = toRefs(props)
const route = useRoute()
</script>
<template>
  <template v-if="item && item.menuList">
    <template v-for="(list, listIndex) in item.menuList" :key="listIndex">
      <RouterLink :to="list.submenu ? '' : list.path" v-if="list.submenu && hasRole(list.roles)">
        <li
          :class="`${route.path.includes(list.path) ? 'bg-secondaryColor' : 'hover:bg-secondaryColor'} p-2 relative group mb-4 rounded-md group  cursor-pointer transition-all duration-150 flex justify-center items-center w-14`"
        >
          <component
            :is="list.icon"
            :class="`${route.path.includes(list.path) ? 'text-white' : 'group-hover:text-white'} text-2xl text-center`"
          />
          <div
            class="absolute min-w-44 top-0 left-14 bg-white shadow-xl p-4 px-8 rounded-md group-hover:block hidden"
          >
            <ul class="flex flex-col gap-3 opacity-65 list-disc ml-3">
              <RouterLink
                v-for="(submenu, subIndex) in list.submenuItems"
                :key="subIndex"
                :to="submenu.path"
              >
                <li
                  v-if="hasRole(submenu.roles)"
                  :class="`${route.path.includes(submenu.path) ? 'text-secondaryColor opacity-100 font-semibold' : 'hover:text-secondaryColor hover:opacity-100 hover:font-semibold'} hover:text-secondaryColor hover:opacity-100 hover:font-semibold transition-all duration-150`"
                >
                  {{ submenu.title }}
                </li>
              </RouterLink>
            </ul>
          </div>
        </li>
      </RouterLink>

      <RouterLink :to="list.path" v-else-if="hasRole(list.roles)">
        <li
          :class="`${route.path.includes(list.path) ? 'bg-secondaryColor text-white' : 'hover:bg-secondaryColor hover:text-white'} p-2 mb-4 rounded-md cursor-pointer transition-all duration-150 flex justify-center items-center w-14`"
        >
          <component :is="list.icon" class="text-2xl text-center" />
        </li>
      </RouterLink>
    </template>
  </template>
  <RouterLink :to="item.path" v-else-if="hasRole(item.roles)">
    <li
      :class="`${route.path.includes(item.path) ? 'bg-secondaryColor text-white' : 'hover:bg-secondaryColor hover:text-white'} p-2 mb-4 rounded-md cursor-pointer transition-all duration-150 flex justify-center items-center w-14`"
    >
      <component :is="item.icon" class="text-2xl text-center" />
    </li>
  </RouterLink>
</template>
