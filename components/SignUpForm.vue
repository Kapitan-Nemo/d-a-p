<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const user = ref({
  email: '',
  password: '',
  name: '',
})

const auth = useAuth()

function createUser() {
  createUserWithEmailAndPassword(getAuth(), user.value.email, user.value.password)
    .then((userCredential) => {
    // Signed up
    //   const user = userCredential.user
      auth.userName = user.value.name

      // TODO: add user to firestore
      useToast('User crated', 'success', 3000)
    })
    .catch((error) => {
      useToast(error.code, 'error', 3000)
    })
}
</script>

<template>
  <h2>Sgin Up</h2>
  <form id="sign_up" @submit.prevent="createUser">
    <input v-model="user.email" required autocomplete="email" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="email" placeholder="email">
    <input v-model="user.password" required autocomplete="current-password" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="password" type="password" placeholder="password">
    <input v-model="user.name" required autocomplete="name" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="name" type="text" placeholder="name">

    <button class="w-full px-8 py-2 bg-black border-black font-bold text-white">
      Sign up
    </button>
  </form>
</template>
