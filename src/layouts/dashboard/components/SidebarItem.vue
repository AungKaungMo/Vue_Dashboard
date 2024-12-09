<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { ChevronRight } from '@/assets/icons'
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { hasRole } from '@/helpers/check-permission'
const props = defineProps({
  item: Object
})
const { item } = toRefs(props)
const route = useRoute()

const isDropOpen = ref(false)

const toggleDropDown = () => {
  isDropOpen.value = !isDropOpen.value
}
</script>

<template v-if="item">
  <template v-if="item.groupTitle">
    <li class="divider my-3 font-semibold" v-if="hasRole(item.roles)">
      {{ item.groupTitle }}
    </li>
    <template v-for="(list, listIndex) in item.menuList" :key="listIndex">
      <li v-if="list.submenu && hasRole(list.roles)">
        <Accordion unstyled collapseIcon="null" expandIcon="null">
          <AccordionTab
            :class="`${route.path.includes(list.path) ? 'bg-secondaryColor text-white' : 'hover:bg-secondaryColor hover:text-white'} transition-all duration-150`"
          >
            <template #header>
              <div
                :class="`flex items-center gap-2 py-3 justify-between group cursor-pointer transition-all duration-150 rounded-md  px-4 ${route.path.includes(list.path) ? 'bg-secondaryColor text-white' : 'hover:bg-secondaryColor hover:text-white'}`"
                @click="toggleDropDown()"
              >
                <div
                  :class="`${route.path.includes(list.path) ? 'opacity-100' : 'group-hover:opacity-100 opacity-70'} flex items-center gap-2 `"
                >
                  <component :is="list.icon" class="text-2xl" />
                  <p>{{ list.title }}</p>
                </div>
                <ChevronRight
                  :class="`transition-all duration-150 ${isDropOpen ? ' transform rotate-90' : ''}`"
                />
              </div>
            </template>
            <ul>
              <RouterLink
                v-for="(subItem, subIndex) in list.submenuItems"
                :key="subIndex"
                :to="subItem.path"
              >
                <template v-if="hasRole(subItem.roles)">
                  <li
                    class="py-2 pr-4 flex items-center ml-8 gap-5 cursor-pointer group transition-all duration-200"
                  >
                    <div
                      :class="`${route.path.includes(subItem.path) ? 'bg-secondaryColor' : 'bg-slate-300 group-hover:bg-secondaryColor'} h-8  w-0.5  transition-all duration-150`"
                    ></div>
                    <p
                      :class="`${route.path.includes(subItem.path) ? 'text-secondaryColor font-semibold' : 'group-hover:text-secondaryColor group-hover:font-semibold'} opacity-60 transition-all duration-150`"
                    >
                      {{ subItem.title }}
                    </p>
                  </li>
                </template>
              </RouterLink>
            </ul>
          </AccordionTab>
        </Accordion>
      </li>

      <RouterLink :to="list.path" v-else-if="hasRole(list.roles)">
        <li
          :class="`flex mb-2  ${route.path.includes(list.path) ? 'opacity-100 bg-secondaryColor text-white' : 'hover:opacity-100 opacity-70 hover:bg-secondaryColor hover:text-white'}  items-center gap-3 py-3 transition-all duration-150 rounded-md  cursor-pointer px-4`"
        >
          <component :is="list.icon" class="text-2xl" />
          <p>{{ list.title }}</p>
        </li>
      </RouterLink>
    </template>
  </template>
  <RouterLink :to="item.path" v-else-if="hasRole(item.roles)">
    <li
      :class="`flex  ${route.path.includes(item.path) ? 'opacity-100 bg-secondaryColor text-white' : 'hover:opacity-100 hover:bg-secondaryColor opacity-70 hover:text-white'}  items-center mb-2 gap-3 py-3 transition-all duration-150 rounded-md  cursor-pointer px-4`"
    >
      <component :is="item.icon" class="text-2xl" />
      <p>{{ item.title }}</p>
    </li>
  </RouterLink>
</template>
