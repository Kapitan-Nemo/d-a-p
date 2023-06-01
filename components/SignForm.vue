<script setup lang="ts">
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const auth = useAuth()
const email = ref('')
const password = ref('')
const createAccount = ref(false)

function singInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      useToast('Login success', 'success', 3000)
    })
    .catch((error) => {
      useToast(error, 'error', 3000)
    })
}

function userCreateAccount() {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
    // Signed up
      const user = userCredential.user
      console.log(user)
      // TODO: add user to firestore
      useToast('User crated', 'success', 3000)
    })
    .catch((error) => {
      useToast(error.code, 'error', 3000)
    })
}

function singInWithEmailAndPassword() {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      useToast(error.code, 'error', 3000)
    })
}

function singOutGoogle() {
  signOut(getAuth())
    .then(async () => {
      useToast('Logout success', 'success', 3000)
    })
    .catch((error) => {
      console.log(error)
      useToast(error, 'error', 3000)
    })
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <!-- TODO: google icon  -->
  <div v-if="!auth.logged && !createAccount" class="flex items-center flex-col">
    <div class="google-btn cursor-pointer" @click="singInWithGoogle">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="~/assets/svg/google-logo.svg">
      </div>
      <p class="btn-text">
        <strong>Sign in with google</strong>
      </p>
    </div>
    <span class="my-6 font-bold ">OR</span>
    <form @submit.prevent="singInWithEmailAndPassword">
      <input v-model="email" required autocomplete="username" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" placeholder="email">
      <input v-model="password" required autocomplete="current-password" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" type="password" placeholder="password">
      <button class="w-full px-8 py-2 bg-black border-black font-bold text-white">
        Email sign in
      </button>
    </form>
    <p class="mt-6">
      Don't have account? <span class="underline cursor-pointer" @click="createAccount = true">sign up</span>
    </p>
  </div>
  <div v-if="createAccount">
    <p>Sing up form</p>
    <p class="mt-6">
      Back to <span class="underline cursor-pointer" @click="createAccount = false">sign in</span>
    </p>
  </div>
  <div v-if="auth.logged" class="flex flex-col items-center ">
    <h2 class="text-2xl font-bold mb-6">
      Hi, {{ auth.userName }} <span class="wave">👋</span>
    </h2>
    <button class="bg-black px-8 py-2 font-bold text-white rounded-none flex items-center justify-center">
      Settings
    </button>
    <span class="my-3 font-bold text-2xl">or</span>
    <button class="px-8 py-2 bg-white border-4 border-black font-bold text-black rounded-none" @click="singOutGoogle">
      Log Out
    </button>
  </div>
</template>

<style lang="scss" scoped>
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

.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
  }
  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
  &:active {
    background: #1669F2;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
