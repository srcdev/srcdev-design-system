import { z } from "@nuxt/content"

// 👇 Base schema for all content types
export const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  bodyClass: z.string().optional(),
})
