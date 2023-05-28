import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuth = defineStore('auth', {
  state: () => ({
    userName: '' as string | null,
    userId: '',
    logged: false,
  }),
  actions: {
    onAuth() {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.userName = user.displayName
          this.userId = user.uid
          this.logged = true
        }
        else {
          this.logged = false
          this.userId = ''
        }
      })
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
