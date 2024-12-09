<template>

                    <!-- class="text-2xl text-blue-500 cursor-pointer hover:text-green-500" -->
  <button
    class="px-1 py-1 text-sm bg-green-300 text-2xl text-white rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 "
    :disabled="true"
  >
    Confirmed
  </button>
</template>

<script>
export default {
  name: 'SmallButton'
}
</script>
