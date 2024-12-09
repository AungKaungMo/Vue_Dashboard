<!------------------------------------------------
   THIS COMPONENT IS FOR PAGE NOT FOUND 
------------------------------------------------->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-gray-800">
    <div class="flex items-center space-x-8">
      <div class="text-9xl font-black">4</div>
      <div class="relative w-32 h-40">
        <div class="absolute bottom-0 left-0 w-32 h-28 rounded-full bg-gray-800"></div>
        <div
          class="absolute bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden w-32 h-32 rounded-b-full"
        >
          <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 border-4 border-gray-800 bg-white rounded-lg"
          >
            <div
              class="absolute top-0 right-0 w-4 h-4 bg-white border-b-4 border-gray-800 transform rotate-45 translate-x-1/2 -translate-y-1/2"
            ></div>
            <div class="relative mt-8">
              <div class="absolute top-0 left-6 flex space-x-4 w-16 h-2">
                <div class="w-2 h-2 rounded-full bg-gray-800 animate-blink"></div>
                <div class="w-2 h-2 rounded-full bg-gray-800 animate-blink"></div>
              </div>
              <div class="absolute top-10 left-4 w-4 h-1 rounded-full bg-pink-300"></div>
              <div class="absolute top-10 right-4 w-4 h-1 rounded-full bg-pink-300"></div>
              <div
                class="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gray-800"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-9xl font-black">4</div>
    </div>

    <div class="mt-12 text-2xl font-light">Oops. The page you're looking for doesn't exist.</div>
    <router-link
      to="/"
      class="mt-8 px-6 py-3 text-white bg-secondaryColor rounded hover:bg-hoverBgColor"
      href="#"
      >Back Home</router-link
    >
  </div>
</template>

<style>
@keyframes blink {
  0%,
  50%,
  100% {
    height: 0.5rem;
  }
  52%,
  54% {
    height: 0.1rem;
  }
}
</style>
