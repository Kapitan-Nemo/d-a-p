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

  <img :src="useAssetsMockup(product?.image)" :alt="product?.title">
  <div class="my-8 flex flex-col items-center justify-center">
    <button
      class="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-indigo-200 rounded-lg"
    >
      Add to Basket{{ product?.price }}
    </button>
  </div>
</template>
