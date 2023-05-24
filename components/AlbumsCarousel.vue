<script setup lang="ts">
// const cartStore = useCart()
const { data: albums } = useFetch('/api/albums')
</script>

<template>
  <div class="px-6 pt-20">
    <h2 class="text-4xl font-bold mb-6">
      Releases
    </h2>

    <Swiper
      :space-between="30"
      :breakpoints="{
        1536: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      }"
    >
      <SwiperControls />

      <SwiperSlide v-for="(album, idx) in albums?.filter(a => a.featured === false)" :key="idx">
        <NuxtLink :to="`/products/${album.slug}`">
          <div>
            <span class="relative">
              <p class="bg-white font-bold text-black py-3 px-5 absolute mt-2 ml-2" :class="album.quantityInWarehouse <= 10 ? 'text-red-700' : ' text-black' ">{{ album.quantityInWarehouse < 10 && album.quantityInWarehouse > 0 ? 'last copies' : album.quantityInWarehouse <= 0 ? 'sold out' : 'out now' }}</p>
              <img class="mb-3 w-full" :src="useAssets(album.image)" :alt="album.title">
            </span>
            <p class="font-bold mb-1">
              {{ album.title }}
            </p>
            <p>
              {{ album.description }}
            </p>
          </div>
        </NuxtLink>
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
