import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: use  nuxtApp.provide('firestore', firestore) in compotents (type problem)

export default function useFirestore() {
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
  const db = getFirestore(app)

  return db
}
