export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  const config = useRuntimeConfig()
  if (!auth.logged || config.public.FIREBASE_ADMINID !== auth.userID) {
    await useToast('You are not authorized to access this page', 'error')
    return navigateTo('/')
  }
})
