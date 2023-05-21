<script setup lang="ts">
import useAssets from '@/composables/useAssets'

const cartStore = useCart()
</script>

<template>
  <h2 class="text-4xl font-bold mb-6">
    December 2021
  </h2>
  <div v-for="album in cartStore.albums.filter(a => a.featured)" :key="album.id" class="mb-6">
    <div class="flex items-start">
      <img :src="useAssets(album.image)" :alt="album.title">
      <div class="ml-6 leading-4 description flex flex-col justify-between ">
        {{ album.description }}
        <div class="flex mt-6">
          <NuxtLink :to="`/products/${album.slug}`" :class="album.quantityInWarehouse > 0 ? 'bg-black' : 'bg-gray-700 c'" class=" px-8 py-2 text-3xl  font-bold text-white rounded-none flex items-center justify-center">
            <span v-if="album.quantityInWarehouse > 0">order</span>
            <span v-else>sold out</span>
          </NuxtLink>
          <button class="px-8 py-2 text-3xl  ml-6 bg-white border-4 border-black font-bold text-black rounded-none">
            listen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
