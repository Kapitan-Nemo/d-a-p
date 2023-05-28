<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const auth = useAuth()

function singInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('login success')
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
    Logiin
  </Header>
  <button class="" @click="singInWithGoogle">
    Google
  </button>
  <p>{{ auth.userName }}</p>
</template>
