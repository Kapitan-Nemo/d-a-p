<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps({
  link: {
    string: true,
    required: true,
  },
})

const cartStore = useCart()
const { cart } = storeToRefs(cartStore)
const cartTotalPrice = computed(() => {
  return cart.value.reduce((acc, product) => acc + product.price * product.quantityInCart, 0)
})
</script>

<template>
  <div class="w-1/2 flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-3">
      Your Order
    </h2>
    <div>
      <p>Number of products: {{ cartStore.cartTotalProducts }}</p>
      <p>Total price: {{ cartTotalPrice }}</p>
      <p>Delivery: 3$</p>
    </div>

    <div class="flex">
      <NuxtLink class="mt-6 w-full px-8 py-2 bg-black border-black font-bold text-white" :to="`${link}`">
        {{ link as string === 'order' ? 'Order' : 'Checkout' }}
      </NuxtLink>
    </div>
  </div>
</template>
