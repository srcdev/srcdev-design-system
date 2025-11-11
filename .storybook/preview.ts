import type { Preview } from "@storybook/vue3-vite"
import { setup } from "@storybook/vue3"
import "../app/assets/styles/main.css"
import { registerComponents, registerNuxtMocks } from "./component-auto-loader"

// Mock Nuxt composables that might be used in components
declare global {
  function useSlots(): Record<string, any>
  function useStyleClassPassthrough(classPassthrough: string | string[]): { elementClasses: string }
}

;(globalThis as any).useSlots = () => ({})
;(globalThis as any).useStyleClassPassthrough = (classPassthrough: string | string[]) => {
  return {
    elementClasses: Array.isArray(classPassthrough) ? classPassthrough.join(" ") : classPassthrough || "",
  }
}

// Setup Vue app with components
setup(async (app) => {
  // Register commonly used components automatically (or specify which ones you want)
  // Leave empty array to register ALL discovered components
  const targetComponents = [
    "LayoutRow",
    "TestStorybook",
    "DisplayBanner",
    // Add more specific components here if you want selective loading
    // Or remove this array to auto-register ALL components
  ]

  await registerComponents(app, targetComponents)

  // Register Nuxt framework component mocks
  registerNuxtMocks(app)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="srcdev-forms-extended srcdev-components-extended"><story /></div>',
    }),
  ],
}

export default preview
