// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@pinia/nuxt',
    // '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  // piniaPersistedstate: {
  //   cookieOptions: {
  //     sameSite: 'strict',
  //   },
  //   storage: 'sessionStorage',
  // },
  css: ['@/assets/scss/global.scss'],
})
