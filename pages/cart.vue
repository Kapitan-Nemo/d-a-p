<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCart()
const { cart, cartTotal } = storeToRefs(cartStore)

// search price in cart and sum
const cartTotalPrice = computed(() => {
  return cart.value.reduce((acc, product) => {
    return acc + product.price * product.quantityInCart
  }, 0)
})
console.log(cartTotalPrice.value)
</script>

<template>
  <Header :cart-link="false">
    Cart
  </Header>
  <NuxtLink to="/">
    Home
  </NuxtLink>
  <div class="px-3 flex">
    <div class="w-1/2">
      <table class="table-auto">
        <thead>
          <tr class="border-b">
            <th class="p-3">
              Product
            </th>
            <th class="p-3">
              Name
            </th>
            <th class="p-3">
              Quantity
            </th>
            <th class="p-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="album in cart" :key="album.id">
            <td class="py-3 pr-3 border-b border-r">
              <NuxtLink :to="`/products/${album.slug}`">
                <img width="250" :src="useAssets(album.image)" :alt="album.title">
              </NuxtLink>
            </td>
            <td class="text-center p-3 font-bold border-b border-r">
              <NuxtLink :to="`/products/${album.slug}`">
                {{ album.title }}
              </NuxtLink>
            </td>
            <td class="text-center p-3 font-bold border-b border-r">
              {{ album.quantityInCart }}
            </td>
            <td class="text-center p-3 font-bold border-b border-r">
              {{ album.price * album.quantityInCart }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-1/2 flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-3">
        Your Order
      </h2>
      <div class="w-60">
        <p>Number of products: {{ cartTotal }}</p>
        <p>Total price: {{ cartTotalPrice }}</p>
        <p>Delivery: 3$</p>
      </div>
    </div>
  </div>
</template>
