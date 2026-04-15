export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  // Fetch user if not already loaded
  if (!user.value) {
    await fetchUser()
  }

  // Check if route requires auth
  if (to.meta.requiresAuth && !user.value) {
    return navigateTo('/login')
  }
})
