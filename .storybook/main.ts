import type { StorybookConfig } from "@storybook/vue3-vite"
import { mergeConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.mdx",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@chromatic-com/storybook", "@storybook/addon-docs", "@storybook/addon-onboarding", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          "~": fileURLToPath(new URL("../", import.meta.url)),
          "@": fileURLToPath(new URL("../", import.meta.url)),
          "~~": fileURLToPath(new URL("../", import.meta.url)),
          "@@": fileURLToPath(new URL("../", import.meta.url)),
        },
      },
      define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      },
      optimizeDeps: {
        include: ["srcdev-nuxt-components", "srcdev-nuxt-forms"],
      },
    })
  },
}

export default config
