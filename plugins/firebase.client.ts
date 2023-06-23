import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
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
    measurementId: config.public.FIREBASE_MEASUREMENTID,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const analytics = getAnalytics(app)
  const storage = getStorage(app)
  return {
    provide: {
      firestore,
      auth,
      analytics,
      storage,
    },
  }
})
