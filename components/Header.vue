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
  breadcrumbs: {
    type: Boolean,
    required: false,
    default: true,
  },
  title: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const cartStore = useCart()
const modal = useModal()
const { cartTotalProducts } = storeToRefs(cartStore)
</script>

<template>
  <div class=" w-fulll h-20 bg-black shape flex items-center justify-center sm:justify-between lg:pl-15 sm:pr-6 my-3">
    <div :class="title ? 'hidden sm:flex' : 'flex'" class="text-white text-sm sm:text-2xl font-bold mx-3 ">
      <NuxtLink v-show="homeLink" to="/">
        <span class="underline underline-offset-8">Shop</span>
        <span class="mx-3">/</span>
      </NuxtLink>
      <h1 class="max-w-[200px] lg:max-w-full sm:max-w-lg">
        <slot />
      </h1>
    </div>
    <div v-show="cartLink" class="flex items-center">
      <img src="~/assets/icons/user.svg" class="cursor-pointer mr-6" alt="user settings" @click="modal.toggleModal()">
      <Nuxt-Link to="/cart" class="text-white">
        <div class="relative flex">
          <img src="~/assets/icons/cart.svg" alt="cart" class="cart-icon">
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
  <div v-show="breadcrumbs && homeLink" class="flex sm:hidden text-sm mb-3 px-3">
    <NuxtLink to="/">
      <span class="underline underline-offset-4">Shop</span>
      <span class="mx-3">/</span>
      <slot />
    </NuxtLink>
  </div>

  <Modal>
    <ClientOnly>
      <SignForm />
    </ClientOnly>
  </Modal>
</template>

<style lang="scss" scoped>
.cart-icon {
  min-width: 38px;
  min-height: 38px;
}
</style>
