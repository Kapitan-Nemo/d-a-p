<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import useAssetsMockup from '@/composables/useAssetsMockup'
import type IAlbum from '~/components/constants/interface'

const cartStore = useCart()
const { albums, cart, cartTotal } = storeToRefs(cartStore)
// TODO: auto import throw error  -  https://github.com/nuxt/nuxt/issues/20827

const route = useRoute()

const product = computed(() => {
  return albums.value.find((product) => {
    return product.slug === route.params.slug
  })
})

const indexCart = computed(() => {
  return cart.value.findIndex((product) => {
    return product.slug === route.params.slug
  })
})

function addToCart() {
  if (cart.value.includes(product.value as IAlbum)) {
    cart.value[indexCart.value].quantityInCart++
    return
  }
  cart.value.push(product.value as IAlbum)
  cart.value[indexCart.value].quantityInCart++
  cartTotal.value = cart.value.length
}
</script>

<template>
  <Header :cart-link="true">
    <NuxtLink class="px-2" to="/">
      <span class="underline underline-offset-8">Shop</span>
      /
    </NuxtLink>
    {{ product?.title }}
  </Header>

  <section class="flex py-3">
    <div class="w-1/2">
      <img :src="useAssetsMockup(product?.image)" :alt="product?.title">
    </div>
    <div class="w-1/2 flex items-center justify-center flex-col">
      <button class=" px-8 py-2 text-3xl bg-black font-bold text-white rounded-none flex items-center justify-center" @click="addToCart">
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
