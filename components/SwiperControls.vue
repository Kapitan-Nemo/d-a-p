<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <div class="flex justify-end mt-6">
    <button class="mr-6 bg-black p-2" @click="swiper.slidePrev()">
      <svgo-arrow-left class="text-white text-2xl" />
    </button>
    <button class="bg-black p-2" @click="swiper.slideNext()">
      <svgo-arrow-right class="text-white text-2xl" />
    </button>
  </div>
</template>
