<script setup lang="ts">
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'

// const config = useRuntimeConfig()
// const stripe = await loadStripe(config.public.STRIPE_PK)

const cartStore = useCart()
const cartTotalPrice = computed(() => {
  return cartStore.cart.reduce((acc, product) => acc + product.price * product.quantityInCart, 0)
})

function order() {
  const orders = doc(collection(getFirestore(), 'orders'))
  const data = {
    ...cartStore.cart,
  }
  // set doc with id
  setDoc(orders, data)
    .then(() => {
      useToast('Order created successfully', 'success')
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
      useToast('Error adding document', 'error')
    })

  // const stripeValues = cart.value.map(a => ({
  //   price: a.stripeId,
  //   quantity: a.quantityInCart,
  // }))

  // stripeValues?.redirectToCheckout({
  //   lineItems,
  //   mode: 'payment',
  //   successUrl: `https://${window.location.host}/success`,
  //   cancelUrl: `https://${window.location.host}/`,
  // })
}
</script>

<template>
  <Header :cart-link="false" :breadcrumbs="false">
    Checkout
  </Header>

  <ClientOnly fallback-tag="div">
    <template #fallback>
      <p class="flex items-center justify-center default-height text-2xl font-bold text-center">
        Loading Checkout...
      </p>
    </template>
    <div class="px-3 flex default-height overflow-scroll">
      <div class="w-1/2">
        <p>test</p>
      </div>
      <div class="w-1/2 flex flex-col items-center">
        <h2 class="text-2xl font-bold mb-3">
          Your Order
        </h2>
        <div class="w-1/2">
          <p>Number of products: {{ cartStore.cartTotalProducts }}</p>
          <p>Total price: {{ cartTotalPrice }}</p>
          <p>Delivery: 3$</p>
          <button class="w-full bg-black text-white text-2xl font-bold py-3 mt-6" @click="order">
            Order
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
