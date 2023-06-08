export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  console.log(to, from)

  if (!auth.logged)
    return navigateTo('/')
})
