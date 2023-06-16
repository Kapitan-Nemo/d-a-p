export default interface IAlbum {
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
