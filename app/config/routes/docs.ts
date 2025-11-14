const cmsUrl = process.env.CMS_URL || "https://cms.srcdev.co.uk"

export default {
  "/aboutus": { redirect: { to: `${cmsUrl}/about-us`, statusCode: 308 } },
} as const
