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
const placeholder = {
  title: 'Loading...',
  description: 'Loading...',
  image: 'Loading...',
  price: 0,
  quantity: 0,
  slug: 'Loading...',
}
// const found = albums.value.find(e => e.slug = route.params.slug)

const product = computed(() => {
  return albums.value.find(e => e.slug === route.params.slug) ?? placeholder
})

const indexCart = computed(() => {
  return cart.value.findIndex(e => e.slug === route.params.slug)
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
    <NuxtLink to="/">
      <span class="underline underline-offset-8">Shop</span>
    </NuxtLink>
    / {{ product?.title }}
  </Header>

  <section class="flex px-3">
    <div class="w-1/2">
      <img :src="useAssetsMockup(product?.image)" :alt="product?.title">
    </div>
    <div class="w-1/2 flex items-center justify-center flex-col">
      <p class="text-2xl font-bold mb-3">
        Price: {{ product?.price }}$ | Format: CD
      </p>
      <p class=" mb-12 px-3">
        {{ product?.description }}
      </p>
      <p>{{ product?.quantity }}</p>
      <button
        class=" px-8 py-2 text-3xl font-bold text-white rounded-none flex items-center justify-center" :class="product?.quantity > 0 ? 'bg-black' : 'bg-gray-700'" @click="addToCart"
      >
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
