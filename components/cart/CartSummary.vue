<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { loadStripe } from '@stripe/stripe-js'

defineProps({
  link: {
    string: true,
    required: true,
  },
})

const userStore = useAuth()
const cartStore = useCart()
const { cart } = storeToRefs(cartStore)
const { userName, userLastName, userStreet, userCity, userZipCode, userPhone, userId, userEmail } = storeToRefs(userStore)
const cartTotalPrice = computed(() => {
  return cart.value.reduce((acc, product) => acc + product.price * product.quantityInCart, 0)
})

const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.STRIPE_PK)

function order() {
  const orders = doc(collection(getFirestore(), 'orders'))
  const data = {
    date: new Date(),
    name: userName.value,
    orderID: orders.id,
    price: cartTotalPrice.value,
    status: 'Pending',
    user: {
      name: userName.value,
      lastName: userLastName.value,
      street: userStreet.value,
      city: userCity.value,
      zipCode: userZipCode.value,
      phone: userPhone.value,
      email: userEmail.value,
      userID: userId.value,
    },
    products: cart.value,
  }

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

  // stripe?.redirectToCheckout({
  //   lineItems: stripeValues,
  //   mode: 'payment',
  //   successUrl: `https://${window.location.host}/success`,
  //   cancelUrl: `https://${window.location.host}/`,
  // })
}
</script>

<template>
  <div class="w-1/2 flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-3">
      Your Order
    </h2>
    <div>
      <p>Number of products: <span class="font-bold">{{ cartStore.cartTotalProducts }}</span></p>
      <p>Total price: <span class="font-bold">{{ cartTotalPrice }}</span></p>
      <p>Delivery: Whoop! Standard shipping is <span class="font-bold">free</span></p>
    </div>

    <div class="flex flex-col">
      <NuxtLink v-if="link === 'checkout'" class="mt-6 w-full px-8 py-2 bg-black border-black font-bold text-white" :to="`${link}`">
        Check Out ->
      </NuxtLink>
      <div v-if="link === 'payment'" class="flex flex-col">
        <button class="mt-6 w-full px-8 py-2 bg-black border-black font-bold text-white" @click="order">
          Pay {{ cartTotalPrice }} $
        </button>
        <small class="font-bold text-center my-2">OR</small>
        <NuxtLink v-if="link === 'payment'" class="w-full font-bold under text-black text-center underline underline-offset-8" to="/cart">
          Back to Cart
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
