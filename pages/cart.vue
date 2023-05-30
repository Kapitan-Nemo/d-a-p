<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { loadStripe } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const cartStore = useCart()
const { cart, cartTotalProducts } = storeToRefs(cartStore)
const stripe = await loadStripe(config.public.STRIPE_PK)

const op = ref(false)
const cartTotalPrice = computed(() => {
  return cart.value.reduce((acc, product) => acc + product.price * product.quantityInCart, 0)
})

function removeFromCart(id: number) {
  cart.value.splice(cart.value.findIndex(e => e.id === id), 1)
  cartTotalProducts.value = cart.value.length
}

function changeQuantity(id: number, op: boolean) {
  const album = cart.value.find(e => e.id === id)
  if (op && album)
    album.quantityInCart += 1
  else if (!op && album && album.quantityInCart > 1)
    album.quantityInCart -= 1
}

function checkout() {
  const lineItems = cart.value.map(a => ({
    price: a.stripeId,
    quantity: a.quantityInCart,
  }))

  stripe?.redirectToCheckout({
    lineItems,
    mode: 'payment',
    successUrl: `https://${window.location.host}/success`,
    cancelUrl: `https://${window.location.host}/`,
  })
}
</script>

<template>
  <Header :cart-link="false">
    Cart
  </Header>

  <ClientOnly fallback-tag="div">
    <template #fallback>
      <p class="flex items-center justify-center cart text-2xl font-bold text-center">
        Loading Cart...
      </p>
    </template>
    <div v-if="cart.length > 0" class="px-3 flex cart overflow-scroll">
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
                  <img width="250" height="250" :src="`/images/${album.image}`" :alt="album.title">
                </NuxtLink>
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                <NuxtLink :to="`/products/${album.slug}`">
                  {{ album.title }}
                </NuxtLink>
              </td>
              <td class="text-center p-3 font-bold border-b border-r">
                <button @click="changeQuantity(album.id, op = false)">
                  -
                </button>
                <span class="mx-3"> {{ album.quantityInCart }}</span>

                <button @click="changeQuantity(album.id, op = true)">
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
      <div class="w-1/2 flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-3">
          Your Order
        </h2>
        <div class="w-1/2">
          <p>Number of products: {{ cartTotalProducts }}</p>
          <p>Total price: {{ cartTotalPrice }}</p>
          <p>Delivery: 3$</p>
          <button class="w-full bg-black text-white text-2xl font-bold py-3 mt-6" @click="checkout()">
            Checkout
          </button>
        </div>
      </div>
    </div>
    <p v-else class="flex items-center justify-center cart text-2xl font-bold text-center">
      Your cart is empty!
    </p>
  </ClientOnly>
</template>

<style lang="scss">
.cart {
  height: calc(100vh - 245px);
}
</style>
