<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import type IAlbum from '~/components/constants/interface'

// TODO: move to composable or pinia?
const cartStore = useCart()
const db = useFirestore()

const querySnapshot = await getDocs(collection(db, 'albums'))
cartStore.albums = []
querySnapshot.forEach((doc) => {
  cartStore.albums.push(doc.data() as IAlbum)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
