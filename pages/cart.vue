<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCart()
const { cart } = storeToRefs(cartStore)
</script>

<template>
  <div>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <h1 class="text-xl">
      Cart
    </h1>
    <div v-for="item in cart" :key="item.id" class="mt-5">
      <p>{{ item.title }}</p>
      <p>{{ item.quantityInCart }}</p>
    </div>
  </div>
</template>
