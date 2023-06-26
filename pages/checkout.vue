<script setup lang="ts">
// import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
const user = ref({
  name: '',
  lastName: '',
  email: '',
})

// const config = useRuntimeConfig()
// const stripe = await loadStripe(config.public.STRIPE_PK)

// function order() {
//   const orders = doc(collection(getFirestore(), 'orders'))
//   const data = {
//     ...cartStore.cart,
//   }
//   // set doc with id
//   setDoc(orders, data)
//     .then(() => {
//       useToast('Order created successfully', 'success')
//     })
//     .catch((error) => {
//       console.error('Error adding document: ', error)
//       useToast('Error adding document', 'error')
//     })

//   // const stripeValues = cart.value.map(a => ({
//   //   price: a.stripeId,
//   //   quantity: a.quantityInCart,
//   // }))

//   // stripeValues?.redirectToCheckout({
//   //   lineItems,
//   //   mode: 'payment',
//   //   successUrl: `https://${window.location.host}/success`,
//   //   cancelUrl: `https://${window.location.host}/`,
//   // })
// }
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
        <h2 class="text-2xl font-bold mb-3">
          <span>1. Address </span>
        </h2>
        <div class="flex flex-col w-1/2">
          <input v-model="user.name" required autocomplete="name" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="name" type="text" placeholder="Name">
          <input v-model="user.lastName" required autocomplete="lastName" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="lastName" type="text" placeholder="Last name">
          <input v-model="user.email" required autocomplete="email" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="email" placeholder="Email">
          <input required autocomplete="address" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="address" placeholder="Address">
          <input required autocomplete="city" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="city" placeholder="City">
          <input required autocomplete="zip" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="zip" placeholder="Zip">
          <div class="flex justify-center items-center mt-6">
            <input id="newsletter" type="checkbox" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2" name="newsletter">
            <label for="newsletter">Subscribe to our newsletter. By signing up you agree to our email privacy policy</label>
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-3">
          2. Delivery method
        </h2>
        <div class="flex flex-col w-1/2">
          <div class="flex items-center mb-3">
            <input id="delivery" type="radio" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2" name="delivery">
            <label for="delivery">Delivery</label>
          </div>
          <div class="flex items-center mb-3">
            <input id="pickup" type="radio" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2" name="delivery">
            <label for="pickup">Pickup</label>
          </div>
        </div>
      </div>
      <CartSummary link="order" />
    </div>
  </ClientOnly>
</template>
