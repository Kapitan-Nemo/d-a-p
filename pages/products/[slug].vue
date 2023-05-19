<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

// import albums from '@/components/constants/albums'
import useAssetsMockup from '@/composables/useAssetsMockup'
import type IAlbum from '~/components/constants/interface'

const cartStore = useCart()
const { albums, cart } = storeToRefs(cartStore)
// TODO: auto import throw error  -  https://github.com/nuxt/nuxt/issues/20827

const route = useRoute()

const product = computed(() => {
  return albums.value.find((product) => {
    return product.slug === route.params.slug
  })
})

function addToCart() {
  console.log('add to cart')
  if (cart.value.includes(product.value as IAlbum)) {
    console.log('already in cart')
    return
  }
  cart.value.push(product.value as IAlbum)
}
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
      <button class=" px-8 py-2 text-3xl bg-black font-bold text-white rounded-none flex items-center justify-center" @click="addToCart()">
        add to cart
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
