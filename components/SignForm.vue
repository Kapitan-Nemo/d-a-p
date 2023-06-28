<script setup lang="ts">
import { doc, getDoc, getFirestore, setDoc } from '@firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const auth = useAuth()
const modal = useModal()
const email = ref('')
const password = ref('')

function singGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      useToast('Login success', 'success')
      // Add a new document in collection "users"
      setDoc(doc(getFirestore(), 'users', auth.userID), {
        name: auth.userName,
        email: auth.userEmail,
        id: auth.userID,
      })
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

function singEmail() {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      useToast('Login success', 'success')
      getDoc(doc(getFirestore(), 'users', auth.userID)).then((doc) => {
        if (doc.exists()) {
          auth.userName = doc.data().name
          auth.userLastName = doc.data().lastName
          auth.userStreet = doc.data().street
          auth.userCity = doc.data().city
          auth.userZipCode = doc.data().zipCode
          auth.userPhone = doc.data().phone
        }
      })
    })
    .catch((error) => {
      useToast(error.code, 'error')
    })
}

function singOut() {
  modal.show = false
  signOut(getAuth())
    .then(async () => {
      useToast('Logout success', 'success')
      auth.$reset()
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <div v-if="!auth.logged && !modal.createAccount" class="flex items-center flex-col">
    <div class="google-btn cursor-pointer" @click="singGoogle">
      <div class="google-icon-wrapper">
        <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" width="705.6" height="720" viewBox="0 0 186.69 190.5" xmlns:v="https://vecta.io/nano"><g transform="translate(1184.583 765.171)"><path clip-path="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4" /><path clip-path="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853" /><path clip-path="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05" /><path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clip-path="none" mask="none" /></g></svg>
      </div>
      <p class="btn-text">
        <strong>Sign in with google</strong>
      </p>
    </div>
    <span class="my-6 font-bold ">OR</span>
    <form id="sign_in" @submit.prevent="singEmail">
      <input v-model="email" required autocomplete="username" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-3 focus:outline-none" type="text" name="email" placeholder="email">
      <input v-model="password" required autocomplete="current-password" class="w-full border-b border-black h-8 text-black caret-black placeholder-gray-500 mb-6 focus:outline-none" name="password" type="password" placeholder="password">
      <button class="w-full px-8 py-2 bg-black border-black font-bold text-white">
        Email sign in
      </button>
    </form>
    <p class="mt-6">
      Don't have account? <span class="underline cursor-pointer" @click="modal.createAccount = true">sign up</span>
    </p>
  </div>
  <div v-if="modal.createAccount && !auth.logged">
    <SignUpForm />
    <p class="mt-6">
      Back to <span class="underline cursor-pointer" @click="modal.createAccount = false">sign in</span>
    </p>
  </div>
  <div v-if="auth.logged" class="flex flex-col items-center ">
    <h2 class="text-2xl font-bold mb-6">
      Hi, {{ auth.userName }} <span class="wave">👋</span>
    </h2>
    <NuxtLink to="/settings" class="" @click="modal.show = false">
      <button class="bg-black px-8 py-2 font-bold text-white rounded-none flex items-center justify-center">
        Settings
      </button>
    </NuxtLink>
    <span class="my-3 font-bold text-2xl">or</span>
    <button class="px-8 py-2 bg-white border-4 border-black font-bold text-black rounded-none" @click="singOut">
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
  width: 230px;
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
  }
  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
  &:active {
    background: #1669F2;
  }
}
</style>
