export default interface IAlbum {
  id: number
  stripeId: string
  title: string
  slug: string | string[]
  description: string
  image: string
  quantityInWarehouse: number
  quantityInCart: number
  price: number
  featured: boolean
}
