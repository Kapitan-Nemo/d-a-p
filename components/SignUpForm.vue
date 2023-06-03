<script setup lang="ts">
import { doc, getFirestore, setDoc } from '@firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const user = ref({
  name: '',
  lastName: '',
  email: '',
  password: '',
  street: '',
  city: '',
  zipCode: '',
  phone: 0,
})

const auth = useAuth()

function createUser() {
  createUserWithEmailAndPassword(getAuth(), user.value.email, user.value.password)
    .then(() => {
      setDoc(doc(getFirestore(), 'users', auth.userId), {
        name: user.value.name,
        lastName: user.value.lastName,
        email: user.value.email,
        street: user.value.street,
        city: user.value.city,
        zipCode: user.value.zipCode,
        phone: user.value.phone,
        id: auth.userId,
      })
      auth.userName = user.value.name
      auth.userLastName = user.value.lastName
      auth.userEmail = user.value.email
      auth.userStreet = user.value.street
      auth.userCity = user.value.city
      auth.userZipCode = user.value.zipCode
      auth.userPhone = user.value.phone

      useToast('User crated', 'success')
    })
    .catch((error) => {
      useToast(error.code, 'error')
    })
}
</script>

<template>
  <form id="sign_up" @submit.prevent="createUser">
    <input v-model="user.name" required autocomplete="name" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="name" type="text" placeholder="Name">
    <input v-model="user.lastName" required autocomplete="lastName" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="lastName" type="text" placeholder="Last name">
    <input v-model="user.email" required autocomplete="email" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="email" placeholder="Email">
    <input v-model="user.password" required autocomplete="current-password" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="password" type="password" placeholder="Password">
    <input v-model="user.street" required autocomplete="street" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="street" type="text" placeholder="Street">
    <input v-model="user.city" required autocomplete="city" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="city" type="text" placeholder="City">
    <input v-model="user.zipCode" required autocomplete="zipCode" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="zipCode" type="text" placeholder="Zip code">
    <input v-model="user.phone" required autocomplete="phone" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="phone" type="number" placeholder="Phone">
    <button class="w-full px-8 py-2 bg-black border-black font-bold text-white">
      Sign up
    </button>
  </form>
</template>
