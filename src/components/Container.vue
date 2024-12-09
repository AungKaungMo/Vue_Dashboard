<!----------------------------------------------------------------------
      THIS COMPONENT IS TO CONTROL TABLE'S LOADING WHEN RENDERING 
----------------------------------------------------------------------->
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  loading: Boolean
})

const { loading } = toRefs(props)
</script>

<template>
  <div v-if="loading">
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <g class="pathdraw" id="Layer_1">
        <path
          id="svg_1"
          d="m162.5,299.2l142.5,-0.2l8,-23l11,23l34,0l14,-109l14,226l12,-118l30,0l5,-15l10,0l7,-16l10,31l155,0"
        />
      </g>
    </svg>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<style scoped>
svg {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  filter: drop-shadow(0 0 25px rgb(8, 114, 175));
}
svg .pathdraw {
  stroke: var(--secondaryColor);
  fill: transparent;
  stroke-width: 6px;
  animation: anim 1.5s linear infinite;
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
}
@keyframes anim {
  to {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
</style>
