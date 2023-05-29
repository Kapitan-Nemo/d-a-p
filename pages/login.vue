<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

const auth = useAuth()

function singInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('login success')
      console.log(auth.logged)
    })
    .catch((error) => {
      console.log(error)
    })
}

function singOutGoogle() {
  signOut(getAuth())
    .then(async () => {
      console.log('logout success')
      console.log(auth.logged)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <Header :cart-link="true">
    Login
  </Header>
  <button class="px-8 py-2 text-3xl  lg:ml-6 bg-white border-4 border-black font-bold text-black rounded-none" @click="singInWithGoogle">
    Sign in with Google
  </button>
  <ClientOnly>
    <div v-if="auth.logged">
      <p>{{ auth.userName }}</p>
      <button @click="singOutGoogle">
        Log Out
      </button>
    </div>
  </ClientOnly>
</template>
