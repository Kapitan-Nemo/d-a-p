<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCart()
const { cartTotal } = storeToRefs(cartStore)
</script>

<template>
  <div class="w-fulll h-20 bg-black shape flex items-center justify-between">
    <h1 class="text-white text-2xl font-bold ">
      <slot />
    </h1>
    <Nuxt-Link to="/cart" class="text-white">
      In Cart: {{ cartTotal }}
    </Nuxt-Link>
  </div>
</template>
