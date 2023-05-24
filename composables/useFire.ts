import { collection, getDocs } from 'firebase/firestore'
import type IAlbum from '~/components/constants/interface'

export default async function useFire() {
  const cartStore = useCart()
  const { $firestore } = useNuxtApp()

  const querySnapshot = await getDocs(collection($firestore, 'albums'))

  if (cartStore.albums.length === 0) {
    // load data from firebase
    console.log('loading data from firebase')
    querySnapshot.forEach((doc) => {
      cartStore.albums.push(doc.data() as IAlbum)
    })
  }
  else {
    console.log('data already loaded')
  }

  return { querySnapshot }
}
