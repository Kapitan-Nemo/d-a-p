export const useModal = defineStore('modal', {
  state: () => ({
    show: false,
    createAccount: false,
  }),
  actions: {
    toggleModal() {
      this.show = !this.show
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useModal, import.meta.hot))
