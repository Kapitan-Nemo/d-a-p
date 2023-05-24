import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_APIKEY,
    authDomain: config.public.FIREBASE_AUTHDOMAIN,
    projectId: config.public.FIREBASE_PROJECTID,
    storageBucket: config.public.FIREBASE_STORAGEBUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGINGSENDERID,
    appId: config.public.FIREBASE_APPID,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  return {
    provide: {
      firestore,
      auth,
    },
  }
})