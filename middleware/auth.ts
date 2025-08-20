interface AuthSession {
  user?: {
    id: string
    login: string
  }
}

export default defineNuxtRouteMiddleware(async (_to) => {
  // Skip middleware on server-side rendering to avoid issues
  if (import.meta.server) return

  try {
    const session = (await $fetch("/api/auth/session")) as AuthSession
    if (!session.user) {
      return navigateTo("/account/login")
    }
  } catch {
    return navigateTo("/account/login")
  }
})
