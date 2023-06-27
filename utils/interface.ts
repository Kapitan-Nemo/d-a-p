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

export interface IUser {
  city: string
  emial: string
  lastName: string
  name: string
  phone: string
  street: string
  userID: string
  zipCode: string
}

export interface IOrders {
  date: Timestamp
  name: string
  orderID: string
  price: number
  products: IAlbum[]
  status: string
}
