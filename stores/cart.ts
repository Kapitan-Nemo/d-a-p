import type IAlbum from '~/components/constants/interface'

export const useCart = defineStore('cart', {
  state: () => ({
    albums: [] as IAlbum[],
    cart: [] as IAlbum[],
    cartTotalProducts: 0,
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
