<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps({
  cartLink: {
    type: Boolean,
    required: true,
  },
})
const cartStore = useCart()
const { cartTotalProducts } = storeToRefs(cartStore)
</script>

<template>
  <div class="w-fulll h-20 bg-black shape flex items-center justify-between pl-15 pr-3 my-3">
    <h1 class="text-white text-2xl font-bold ml-3">
      <slot />
    </h1>
    <Nuxt-Link v-show="cartLink" to="/cart" class="text-white">
      <ClientOnly fallback-tag="p" fallback="Loading Cart...">
        <p>In Cart: {{ cartTotalProducts }} </p>
      </ClientOnly>
    </Nuxt-Link>
  </div>
</template>
