import type { App } from "vue"

// Import actual components from srcdev-nuxt-components (only the ones we need)
import LayoutRow from "srcdev-nuxt-components/app/components/layout-row/LayoutRow.vue"
import DisplayBanner from "srcdev-nuxt-components/app/components/display-banner/DisplayBanner.vue"
import TabsCore from "srcdev-nuxt-components/app/components/tabs/TabsCore.vue"
import AccordianCore from "srcdev-nuxt-components/app/components/accordian/AccordianCore.vue"
import CarouselBasic from "srcdev-nuxt-components/app/components/carousel-basic/CarouselBasic.vue"
import CarouselFlip from "srcdev-nuxt-components/app/components/carousel-basic/CarouselFlip.vue"
import ClipElement from "srcdev-nuxt-components/app/components/clip-element/ClipElement.vue"
// Temporarily excluding DisplayGridCore due to prop validation issues in Storybook
// import DisplayGridCore from "srcdev-nuxt-components/app/components/display-grid/DisplayGridCore.vue"
import LayoutGridA from "srcdev-nuxt-components/app/components/layout-grids/LayoutGridA.vue"
import LayoutGridB from "srcdev-nuxt-components/app/components/layout-grids/LayoutGridB.vue"
import PopOver from "srcdev-nuxt-components/app/components/pop-over/PopOver.vue"
import SkipLinks from "srcdev-nuxt-components/app/components/skip-links/SkipLinks.vue"
import UiBlockDecorated from "srcdev-nuxt-components/app/components/ui-block-decorated/UiBlockDecorated.vue"

// TODO: Add imports for srcdev-nuxt-forms components as needed
// You can add form components here when you need them in stories

export function registerComponents(app: App) {
  // Register srcdev-nuxt-components
  app.component("LayoutRow", LayoutRow)
  app.component("DisplayBanner", DisplayBanner)
  app.component("TabsCore", TabsCore)
  app.component("AccordianCore", AccordianCore)
  app.component("CarouselBasic", CarouselBasic)
  app.component("CarouselFlip", CarouselFlip)
  app.component("ClipElement", ClipElement)
  // app.component("DisplayGridCore", DisplayGridCore) // Temporarily disabled
  app.component("LayoutGridA", LayoutGridA)
  app.component("LayoutGridB", LayoutGridB)
  app.component("PopOver", PopOver)
  app.component("SkipLinks", SkipLinks)
  app.component("UiBlockDecorated", UiBlockDecorated)

  // Add form components as needed:
  // app.component("FormWrapper", FormWrapper)
  // app.component("InputTextWithLabel", InputTextWithLabel)
  // etc.
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
