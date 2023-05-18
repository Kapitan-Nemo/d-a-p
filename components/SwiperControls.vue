<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <button class="mr-6" @click="swiper.slidePrev()">
    Previous
  </button>
  <button @click="swiper.slideNext()">
    Next
  </button>
</template>
