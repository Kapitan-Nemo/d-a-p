<script setup lang="ts">
import { useRoute } from 'vue-router'

import type IAlbum from '~/components/constants/interface'

const cartStore = useCart()
const route = useRoute()

const { data: albums } = await useFetch('/api/albums')
// TODO: move to store

// TODO: move to constats
const defaultProduct = {
  id: 0,
  title: '',
  slug: '',
  description: '',
  image: '',
  quantityInWarehouse: 0,
  quantityInCart: 0,
  price: 0,
  featured: false,
}

const product = albums.value?.find(e => e.slug === route.params.slug) ?? defaultProduct

const indexCart = computed(() => {
  return cartStore.cart.findIndex(e => e.slug === route.params.slug)
})

function addToCart() {
  useToast('Product added to cart', 'success')
  if (cartStore.cart.some(a => a.slug === route.params.slug)) {
    cartStore.cart[indexCart.value].quantityInCart++
  }
  else {
    cartStore.cart.push(product as IAlbum)
    cartStore.cart[indexCart.value].quantityInCart++
    cartStore.cartTotalProducts = cartStore.cart.length
  }
}
</script>

<template>
  <Header :cart-link="true">
    {{ product?.title }}
  </Header>

  <section class="flex px-3">
    <div class="w-1/2">
      <img width="861" height="861" :src="`/images/mockup/${product.image}`" :alt="product.title">
    </div>
    <div class="w-1/2 flex items-center justify-center flex-col">
      <p class="text-2xl font-bold mb-3">
        Price: {{ product?.price }}$ | Format: CD
      </p>
      <p class=" mb-12 px-3">
        {{ product?.description }}
      </p>
      <button
        :disabled="product?.quantityInWarehouse === 0"
        class=" px-8 py-2 text-3xl font-bold text-white rounded-none flex items-center justify-center" :class="product.quantityInWarehouse > 0 ? 'bg-black' : 'bg-gray-700 cursor-not-allowed'" @click="addToCart"
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
