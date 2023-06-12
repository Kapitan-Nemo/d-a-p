export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  const config = useRuntimeConfig()
  if (!auth.logged || config.public.FIREBASE_ADMINID !== auth.userId)
    return navigateTo('/')
})
