<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import albums from '@/components/constants/albums'

const route = useRoute()

const product = computed(() => {
  return albums.value.find((product) => {
    return product.slug === route.params.slug
  })
})
</script>

<template>
  <Header>
    {{ product?.title }}
  </Header>
  <section class="flex px-3">
    <div class="w-1/2">
      <img :src="useAssetsMockup(product?.image)" :alt="product?.title">
    </div>
    <div class="w-1/2 flex items-center justify-center flex-col">
      <button class=" px-8 py-2 text-3xl bg-black font-bold text-white rounded-none flex items-center justify-center">
        order
      </button>
      <p class="font-bold text-lg my-3">
        OR
      </p>
      <button class="px-8 py-2 text-3xl bg-white border-4 border-black font-bold text-black rounded-none">
        listen
      </button>
    </div>
  </section>
</template>
