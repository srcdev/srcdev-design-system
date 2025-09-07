import type { Preview } from "@storybook-vue/nuxt"
import {
  // INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from "storybook/viewport"

import "@/assets/styles/main.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    viewport: { value: "ipad", isRotated: false },
  },
}

export default preview
