<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps({
  cartLink: {
    type: Boolean,
    required: true,
  },
  homeLink: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const cartStore = useCart()
const modal = useModal()
const { cartTotalProducts } = storeToRefs(cartStore)
</script>

<template>
  <div class=" w-fulll h-20 bg-black shape flex items-center justify-between lg:pl-15 pr-6 my-3">
    <div class="text-white text-sm  sm:text-2xl font-bold mx-3 flex">
      <NuxtLink v-show="homeLink" to="/">
        <span class="underline underline-offset-8">Shop</span>
        <span class="mx-3">/</span>
      </NuxtLink>
      <h1>
        <slot />
      </h1>
    </div>
    <div v-show="cartLink" class="flex items-center">
      <img src="~/assets/svg/user.svg" class="mr-10 cursor-pointer" alt="login" @click="modal.toggleModal()">
      <Nuxt-Link to="/cart" class="text-white">
        <div class="relative">
          <img src="~/assets/svg/cart.svg" alt="cart">
          <ClientOnly>
            <template #fallback>
              <span class="bg-white rounded-full h-4 w-4 flex text-black items-center justify-center absolute -top-2 -right-2 font-bold text-sm">0</span>
            </template>
            <span class="bg-white rounded-full h-4 w-4 flex text-black items-center justify-center absolute -top-2 -right-2 font-bold text-sm">{{ cartTotalProducts }} </span>
          </ClientOnly>
        </div>
      </Nuxt-Link>
    </div>
  </div>
  <Modal>
    <ClientOnly>
      <LoginForm />
    </ClientOnly>
  </Modal>
</template>
