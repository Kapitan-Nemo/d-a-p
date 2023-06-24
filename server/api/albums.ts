import type { IAlbum } from 'utils/interface'
import { firestore } from '@/utils/firebase'

export default defineEventHandler(async () => {
  const ref = firestore.collection('albums/')
  const snapshot = await ref.get()
  const data = snapshot.docs.map(doc => doc.data() as IAlbum)
  return data
})
