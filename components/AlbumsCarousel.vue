<script setup lang="ts">
import albums from '@/components/constants/albums'

const featuredAlbums = computed(() => {
  return albums.value.filter((album) => {
    return album.featured === false
  })
})
</script>

<template>
  <div class="px-6 pt-20">
    <h2 class="text-4xl font-bold mb-6">
      Releases
    </h2>

    <Swiper
      :slides-per-view="5"
      :space-between="50"
    >
      <SwiperControls />

      <SwiperSlide v-for="(album, idx) in featuredAlbums" :key="idx">
        <div>
          <span class="relative">
            <p class="bg-white font-bold text-black py-3 px-5 absolute mt-2 ml-2" :class="album.quantity <= 10 ? 'text-red-700' : ' text-black' ">{{ album.quantity < 10 && album.quantity > 0 ? 'last copies' : album.quantity <= 0 ? 'sold out' : 'out now' }}</p>
            <img class="mb-3" :src="useAssets(album.image)" :alt="album.title">
          </span>
          <p class="font-bold mb-1">
            {{ album.title }}
          </p>
          <p>
            {{ album.description }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss">
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
</style>
