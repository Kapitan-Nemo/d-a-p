<script setup lang="ts">
import albums from '@/components/constants/albums'
import useAssets from '@/composables/useAssets'

// TODO: auto import throw error  -  https://github.com/nuxt/nuxt/issues/20827

const featuredAlbums = computed(() => {
  return albums.value.filter((album) => {
    return album.featured
  })
})
</script>

<template>
  <h2 class="text-4xl font-bold mb-6">
    December 2021
  </h2>
  <div v-for="album in featuredAlbums" :key="album.id" class="mb-6">
    <div class="flex items-start">
      <img :src="useAssets(album.image)" :alt="album.title">
      <div class="ml-6 leading-4 description flex flex-col justify-between ">
        {{ album.description }}
        <div class="flex mt-6">
          <NuxtLink :to="`/products/${album.slug}`" class=" px-8 py-2 text-3xl bg-black font-bold text-white rounded-none flex items-center justify-center">
            order
          </NuxtLink>
          <button class="px-8 py-2 text-3xl  ml-6 bg-white border-4 border-black font-bold text-black rounded-none">
            listen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
