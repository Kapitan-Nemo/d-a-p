<script setup lang="ts">
import { storeToRefs } from 'pinia'

const userStore = useAuth()

const { userName, userLastName, userStreet, userCity, userZipCode, userPhone, userEmail } = storeToRefs(userStore)
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
          <div>
            <input v-model="userName" required autocomplete="name" class="mr-3 border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" name="name" type="text" placeholder="Name">
            <input v-model="userLastName" required autocomplete="lastName" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" name="lastName" type="text" placeholder="Last name">
          </div>
          <div>
            <input v-model="userCity" required autocomplete="city" class="mr-3 border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="city" placeholder="City">
            <input v-model="userZipCode" required autocomplete="zip" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="zip" placeholder="Zip">
          </div>
          <div>
            <input v-model="userEmail" required autocomplete="email" class="mr-3 border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="email" placeholder="Email">
            <input v-model="userPhone" required autocomplete="phone" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="phone" placeholder="Phone">
          </div>

          <input v-model="userStreet" required autocomplete="address" class="border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="address" placeholder="Address">
        </div>
        <h2 class="text-2xl font-bold mb-3">
          2. Delivery method
        </h2>
        <div class="flex flex-col w-full">
          <div class="flex items-center mb-3">
            <input id="delivery" checked type="radio" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" name="delivery">
            <label for="delivery">DPD Delivery</label>
            <small class="ml-3">(5-8 working days)</small>
          </div>
          <div class="flex items-center mb-3">
            <input id="pickup" type="radio" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" name="delivery">
            <label for="pickup">Self Pickup</label>
          </div>

          <h2 class="text-2xl font-bold mb-3">
            3. Payment method
          </h2>

          <div class="flex items-center mb-3">
            <input id="paypal" checked type="radio" class="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" name="payment">
            <label for="paypal">Stripe</label>
          </div>
        </div>
      </div>
      <CartSummary link="payment" />
    </div>
  </ClientOnly>
</template>
