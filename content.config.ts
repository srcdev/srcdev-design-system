// content.config.ts
import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        bodyClass: z.string().optional(), // ✅ tell Nuxt Content about your custom field
      }),
    }),
  },
})
