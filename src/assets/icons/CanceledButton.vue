<template>
  <button
    class="px-1 py-1 text-sm bg-gray-500 text-red rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
    :disabled="true"
  >
    Canceled
  </button>
</template>

<script>
export default {
  name: 'SmallButton'
}
</script>
