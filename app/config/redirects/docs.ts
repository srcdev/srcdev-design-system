import type { DynamicRedirectRule } from "./types"
const cmsUrl = process.env.CMS_URL || "https://cms.srcdev.co.uk"

export const docsRedirects: DynamicRedirectRule[] = [
  {
    from: "/blog/:slug",
    to: `${cmsUrl}/blog/:slug`,
    statusCode: 308,
    external: true,
    preserveQuery: true,
  },
]
