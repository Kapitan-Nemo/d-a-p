import type { Timestamp } from 'firebase-admin/firestore'

export interface IAlbum {
  id: string
  stripeId: string
  title: string
  slug: string | string[]
  description: string
  image: string
  quantityInWarehouse: number
  quantityInCart: number
  price: number
  featured: boolean
  link: string
}

export interface IOrders {
  date: Timestamp
  name: string
  orderID: string
  price: number
  status: string
  userID: string
}
