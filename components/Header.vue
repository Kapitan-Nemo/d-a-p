<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps({
  cartLink: {
    type: Boolean,
    required: true,
  },
  homeLink: {
    type: Boolean,
    required: false,
    default: true,
  },
})
const cartStore = useCart()
const { cartTotalProducts } = storeToRefs(cartStore)
</script>

<template>
  <div class=" w-fulll h-20 bg-black shape flex items-center justify-between lg:pl-15 pr-3 my-3">
    <div class="text-white text-sm  sm:text-2xl font-bold mx-3 flex">
      <NuxtLink v-show="homeLink" to="/">
        <span class="underline underline-offset-8">Shop</span>
        <span class="mx-3">/</span>
      </NuxtLink>
      <h1>
        <slot />
      </h1>
    </div>
    <Nuxt-Link v-show="cartLink" to="/cart" class="text-white">
      <ClientOnly fallback-tag="p" fallback="Loading Cart...">
        <p>In Cart: {{ cartTotalProducts }} </p>
      </ClientOnly>
    </Nuxt-Link>
  </div>
</template>
