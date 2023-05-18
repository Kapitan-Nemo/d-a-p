<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
  <div class="flex justify-end mt-6">
    <button class="mr-6 bg-black p-2" @click="swiper.slidePrev()">
      <img src="@/assets/images/svg/arrow-left.svg" alt="arrow-left">
    </button>
    <button class="bg-black p-2" @click="swiper.slideNext()">
      <img src="@/assets/images/svg/arrow-right.svg" alt="arrow-right">
    </button>
  </div>
</template>
