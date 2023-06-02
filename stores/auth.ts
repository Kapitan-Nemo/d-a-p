import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuth = defineStore('auth', {
  state: () => ({
    userName: '' as string | null,
    userId: '',
    userEmail: '' as string | null,
    logged: false,
  }),
  actions: {
    onAuth() {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.userName = user.displayName
          this.userId = user.uid
          this.userEmail = user.email
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
