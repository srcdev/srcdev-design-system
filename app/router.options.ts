// app/router.options.ts (Nuxt 3)
import type { RouterConfig } from "@nuxt/schema"

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Restore on back/forward
    if (savedPosition) {
      return savedPosition
    }

    // If hash/anchor exists, scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth", // optional
      }
    }

    // Default scroll to top
    return { top: 0 }
  },
}
