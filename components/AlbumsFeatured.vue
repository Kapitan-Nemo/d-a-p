<script setup lang="ts">
// const cartStore = useCart()
const { data: albums } = await useFetch('/api/albums')
</script>

<template>
  <h2 class="text-4xl font-bold mb-6">
    December 2021
  </h2>
  <div v-for="album in albums?.filter(a => a.featured)" :key="album.id" class="mb-6">
    <div class="flex flex-col md:flex-row items-start">
      <img class="album w-full" width="250" height="250" :src="`/images/${album.image}`" :alt="album.title">
      <div class="mt-6 md:mt-0 md:ml-6 leading-4 description flex flex-col justify-between ">
        {{ album.description }}
        <div class="flex flex-col lg:flex-row mt-6">
          <NuxtLink :to="`/products/${album.slug}`" :class="album.quantityInWarehouse > 0 ? 'bg-black' : 'bg-gray-700 c'" class=" mb-6 lg:mb-0 px-8 py-2 text-3xl  font-bold text-white rounded-none flex items-center justify-center">
            <span v-if="album.quantityInWarehouse > 0">order</span>
            <span v-else>sold out</span>
          </NuxtLink>
          <a target="_blank" :href="album.link" class="px-8 py-2 text-3xl  lg:ml-6 bg-white border-4 border-black font-bold text-black rounded-none">
            listen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.album {
  // max-height: 250px;
  object-fit: cover;
  @media screen and (min-width: 1024px) {
    max-width: 250px;
  }
}
</style>
