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
  <!-- TODO: google icon  -->
  <div v-if="!auth.logged" class="flex items-center flex-col max-h-96">
    <button class="px-8 py-2 text-3xl  bg-white border-4 border-black font-bold text-black rounded-none" @click="singInWithGoogle">
      Sign in with Google
    </button>
    <span class="my-3 font-bold text-2xl">OR</span>
    <button class="px-8 py-2 text-3xl mb-6  bg-white border-4 border-black font-bold text-black rounded-none">
      Email sign in
    </button>
    <input class="border-b border-black border-spacing-y-4 h-10 text-black caret-black placeholder-gray-500 text-2xl mb-3 focus:outline-none" type="text" placeholder="email">
    <input class="border-b border-black border-spacing-y-4 h-10 text-black caret-black placeholder-gray-500 text-2xl focus:outline-none" type="password" placeholder="password">
  </div>
  <div v-if="auth.logged" class="flex flex-col items-center ">
    <h2 class="text-2xl font-bold mb-6">
      Hi, {{ auth.userName }} <span class="wave">👋</span>
    </h2>
    <button class="bg-black px-8 py-2 text-3xl font-bold text-white rounded-none flex items-center justify-center">
      Settings
    </button>
    <span class="my-3 font-bold text-2xl">or</span>
    <button class="px-8 py-2 text-3xl  bg-white border-4 border-black font-bold text-black rounded-none" @click="singOutGoogle">
      Log Out
    </button>
  </div>
</template>

<style  lang="scss" scoped>
.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}
</style>
