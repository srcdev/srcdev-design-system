import type { App } from "vue"

// Import directly from the generated Nuxt types to ensure consistency
// This leverages Nuxt's component auto-discovery system
async function importComponent(path: string) {
  try {
    const component = await import(path)
    return component.default
  } catch (error) {
    console.warn(`Failed to load component from ${path}:`, error)
    return null
  }
}

// Component mapping based on .nuxt/types/components.d.ts
// Only include the components you actually need for Storybook
const componentPaths = {
  // Essential layout components
  LayoutRow: "../../node_modules/srcdev-nuxt-components/app/components/layout-row/LayoutRow.vue",
  DisplayBanner: "../../node_modules/srcdev-nuxt-components/app/components/display-banner/DisplayBanner.vue",

  // Essential form components
  FormField: "../../node_modules/srcdev-nuxt-forms/app/components/forms/ui/FormField.vue",
  FormWrapper: "../../node_modules/srcdev-nuxt-forms/app/components/forms/ui/FormWrapper.vue",
  InputTextWithLabel:
    "../../node_modules/srcdev-nuxt-forms/app/components/forms/input-text/variants/InputTextWithLabel.vue",

  // Your local test component
  TestStorybook: "../../app/components/test-storybook/TestStorybook.vue",

  // Add more as needed by copying paths from .nuxt/types/components.d.ts
  // AccordianCore: "../../node_modules/srcdev-nuxt-components/app/components/accordian/AccordianCore.vue",
  // TabsCore: "../../node_modules/srcdev-nuxt-components/app/components/tabs/TabsCore.vue",
  // InputButtonSubmit: "../../node_modules/srcdev-nuxt-forms/app/components/forms/input-button/variants/InputButtonSubmit.vue",
  // SingleCheckbox: "../../node_modules/srcdev-nuxt-forms/app/components/forms/input-checkbox/SingleCheckbox.vue",
} as const

export async function registerComponents(app: App) {
  // Register only the components we need for current stories
  const componentsToRegister = [
    "LayoutRow",
    "TestStorybook",
    // Add more component names here as you create stories for them
    // 'FormField',
    // 'FormWrapper',
    // 'InputTextWithLabel',
  ] as const

  for (const componentName of componentsToRegister) {
    const path = componentPaths[componentName]
    if (path) {
      const component = await importComponent(path)
      if (component) {
        app.component(componentName, component)
        console.log(`✅ Registered component: ${componentName}`)
      }
    }
  }
}

// Helper function to register a specific component on demand
export async function registerComponent(app: App, componentName: keyof typeof componentPaths) {
  const path = componentPaths[componentName]
  if (path) {
    const component = await importComponent(path)
    if (component) {
      app.component(componentName, component)
      console.log(`✅ Registered component: ${componentName}`)
      return true
    }
  }
  return false
}

export function registerNuxtMocks(app: App) {
  // Mock Nuxt framework components
  app.component("Icon", {
    props: {
      name: { type: String, required: true },
      size: { type: [String, Number], default: "1em" },
    },
    template: `
      <span
        :style="{
          display: 'inline-block',
          width: typeof size === 'number' ? size + 'px' : size,
          height: typeof size === 'number' ? size + 'px' : size,
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

  app.component("NuxtImg", {
    props: {
      src: { type: String, required: true },
      alt: { type: String, default: "" },
      width: { type: [String, Number] },
      height: { type: [String, Number] },
      loading: { type: String, default: "lazy" },
    },
    template: `
      <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        v-bind="$attrs"
      />
    `,
  })

  app.component("NuxtLink", {
    props: {
      to: { type: [String, Object], required: true },
      external: { type: Boolean, default: false },
    },
    template: `
      <a
        :href="typeof to === 'string' ? to : to.path || to.href"
        :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined"
        v-bind="$attrs"
      >
        <slot />
      </a>
    `,
  })

  app.component("ClientOnly", {
    template: `<slot />`,
  })

  app.component("NuxtLayout", {
    props: {
      name: { type: String, default: "default" },
    },
    template: `
      <div class="nuxt-layout">
        <slot />
      </div>
    `,
  })
}
