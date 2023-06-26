<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCart()
const { cart, cartTotalProducts } = storeToRefs(cartStore)

const operation = ref(false)

function removeFromCart(id: string) {
  cart.value.splice(cart.value.findIndex(e => e.id === id), 1)
  cartTotalProducts.value = cart.value.length
}

function changeQuantity(id: string, operation: boolean) {
  const album = cart.value.find(e => e.id === id)
  if (operation && album)
    album.quantityInCart += 1
  else if (!operation && album && album.quantityInCart > 1)
    album.quantityInCart -= 1
}
</script>

<template>
  <Header :cart-link="false" :breadcrumbs="false">
    Cart
  </Header>

  <ClientOnly fallback-tag="div">
    <template #fallback>
      <p class="flex items-center justify-center default-height text-2xl font-bold text-center">
        Loading Cart...
      </p>
    </template>
    <div v-if="cart.length > 0" class="px-3 flex default-height overflow-scroll">
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
                  <img width="250" height="250" :src="album.image" :alt="album.title">
                </NuxtLink>
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                <NuxtLink :to="`/products/${album.slug}`">
                  {{ album.title }}
                </NuxtLink>
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                <button @click="changeQuantity(album.id, operation = false)">
                  -
                </button>
                <span class="mx-3"> {{ album.quantityInCart }}</span>

                <button @click="changeQuantity(album.id, operation = true)">
                  +
                </button>
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                {{ album.price * album.quantityInCart }}
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                <button @click="removeFromCart(album.id)">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CartSummary link="checkout" />
    </div>
    <div v-else class="flex items-center justify-center flex-col default-height  ">
      <p class="text-2xl font-bold mb-6">
        Your cart is empty!
        Maybe you should add some products?
      </p>
      <img src="@/assets/images/duck-spinning.gif" alt="very weird spinning duck" class="">
    </div>
  </ClientOnly>
</template>
