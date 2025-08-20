export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  // console.log("Auth middleware triggered", loggedIn.value, to.path)

  if (loggedIn.value) {
    if (to.path === "/account/login") {
      return navigateTo("/account/dashboard")
    }
  } else if (!loggedIn.value) {
    if (to.path === "/account/login") return
    return navigateTo("/account/login")
  }
})
