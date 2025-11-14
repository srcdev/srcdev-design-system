import { dynamicRedirects } from "~/config/redirects"
import { applyParams } from "~/utils/applyParams"

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path

  for (const rule of dynamicRedirects) {
    // Convert `/blog/:slug` into a regex with named groups
    const fromPattern = rule.from.replace(/:([A-Za-z0-9_]+)/g, "(?<$1>[^/]+)").replace(/\//g, "\\/")

    const regex = new RegExp(`^${fromPattern}$`)
    const match = path.match(regex)

    if (!match) continue

    // Extract params
    const params = match.groups || {}

    // Build final destination URL
    let finalUrl = applyParams(rule.to, params)

    // Preserve querystring?
    if (rule.preserveQuery && Object.keys(to.query).length) {
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries(to.query).map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : (value ?? "")])
        )
      ).toString()
      finalUrl += `?${qs}`
    }

    // Perform redirect
    return navigateTo(finalUrl, {
      external: rule.external ?? false,
      redirectCode: rule.statusCode ?? 302,
    })
  }
})
