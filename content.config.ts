// content.config.ts
import { defineCollection, defineContentConfig, z } from "@nuxt/content"
import { baseSchema } from "./schemas/base"

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
      schema: baseSchema, // ✅ tell Nuxt Content about your custom field
    }),
    // Blog posts
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: baseSchema.extend({
        publishedAt: z.string().datetime().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
