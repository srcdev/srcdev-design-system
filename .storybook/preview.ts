import type { Preview } from "@storybook/vue3-vite"
import { setup } from "@storybook/vue3"
import "../app/assets/styles/main.css"

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

// Setup Vue app with global components
setup((app) => {
  // Mock LayoutRow component
  app.component("LayoutRow", {
    props: {
      tag: { type: String, default: "div" },
      variant: { type: String, default: "full-width" },
      styleClassPassthrough: { type: Array, default: () => [] },
    },
    template: `
      <component :is="tag" :class="['layout-row', variant, ...styleClassPassthrough]">
        <slot />
      </component>
    `,
  })

  // Mock Icon component
  app.component("Icon", {
    props: {
      name: { type: String, required: true },
      size: { type: String, default: "1em" },
    },
    template: `
      <span
        :style="{
          display: 'inline-block',
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          maskImage: 'url(https://api.iconify.design/' + name.replace(':', '/') + '.svg)',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain'
        }"
        :title="name"
      ></span>
    `,
  })
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
