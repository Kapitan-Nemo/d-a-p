// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
      FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
      FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
      FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
      FIREBASE_ADMINID: process.env.FIREBASE_ADMINID,
      STRIPE_PK: process.env.STRIPE_PK,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    'nuxt-svgo',
  ],
  svgo: {
    global: false,
  },

  swiper: {
    modules: ['free-mode'],
  },
  components: [
    { path: '~/components/admin', prefix: 'Admin' }, '~/components',
  ],

  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Admin dashboard renders only on client-side
    '/admin/**': { ssr: false },

  },
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  css: ['@/assets/scss/global.scss'],
})
