import type { IAlbum } from 'utils/interface'

export const useCart = defineStore('cart', {
  state: () => ({
    cart: [] as IAlbum[],
    cartTotalProducts: 0,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
