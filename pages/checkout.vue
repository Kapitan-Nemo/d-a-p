<script setup lang="ts">
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'

// const config = useRuntimeConfig()
// const stripe = await loadStripe(config.public.STRIPE_PK)

const cartStore = useCart()

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
        <!-- //TODO: add form -->
      </div>
      <CartSummary />
    </div>
  </ClientOnly>
</template>
