export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  // FIXME: auth.logged only for admins
  if (!auth.logged)
    useToast('You are not authorized to access this page', 'error')
  return navigateTo('/')
})
