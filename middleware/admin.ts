export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  // FIXME: auth.logged only for admins
  if (!auth.logged)
    return navigateTo('/')
})
