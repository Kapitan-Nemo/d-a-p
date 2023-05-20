export default interface IAlbum {
  id: number
  title: string
  slug: string | string[]
  description: string
  image: string
  quantity: number
  quantityInCart: number
  price: number
  featured: boolean
}
