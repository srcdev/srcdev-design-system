<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <section>
          <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
            <h1 class="page-heading-1">LayoutRow component</h1>

            <p class="page-body-normal">Examples of various layout configurations using the LayoutRow component.</p>

            <h2 class="page-heading-2">Commonly used variants</h2>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full width LayoutRow</h2>

            <p class="page-body-normal"><code>--full-max-width: 1fr;</code></p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="full-width"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="full" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full LayoutRow</h2>

            <p class="page-body-normal"><code>--full-max-width: 1fr;</code></p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="full"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-content" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full content LayoutRow</h2>

            <p class="page-body-normal"><code>--full-max-width: 1fr;</code></p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="full-content"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="popout" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Popout LayoutRow</h2>

            <p class="page-body-normal"><code>--popout-max-width: 1400px</code></p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="popout"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="content" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Content LayoutRow</h2>

            <p class="page-body-normal">
              <code>--content-max-width: 1060px;</code>
            </p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="content"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="inset-content" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Inset Content LayoutRow</h2>

            <p class="page-body-normal">
              <code>--inset-content-max-width: 840px;</code>
            </p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="inset-content"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
            <h2 class="page-heading-2">Less commonly used variants</h2>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-start" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full start LayoutRow</h2>

            <p class="page-body-normal">Example full-track</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="full-start"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-end" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full end LayoutRow</h2>

            <p class="page-body-normal">Example full-track</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="full-end"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="full-content-nopad" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Full content-nopad LayoutRow</h2>

            <p class="page-body-normal">Example full-track</p>
            <pre class="page-body-normal">
&lt;LayoutRow tag="div" variant="full-content-nopad"&gt;&lt;/LayoutRow&gt;</pre
            >
          </LayoutRow>

          <LayoutRow tag="div" variant="popout-start" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Popout Start LayoutRow</h2>

            <p class="page-body-normal">Example popout start</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="popout-start"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="popout-end" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Popout End LayoutRow</h2>

            <p class="page-body-normal">Example popout end</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="popout-end"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="content-start" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Content Start LayoutRow</h2>

            <p class="page-body-normal">Example content start</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="content-start"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="content-end" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Content End LayoutRow</h2>

            <p class="page-body-normal">Example content end</p>
            <pre class="page-body-normal">&lt;LayoutRow tag="div" variant="content-end"&gt;&lt;/LayoutRow&gt;</pre>
          </LayoutRow>

          <LayoutRow tag="div" variant="inset-content-start" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Inset Content Start LayoutRow</h2>

            <p class="page-body-normal">Example inset content start</p>
            <pre class="page-body-normal">
&lt;LayoutRow tag="div" variant="inset-content-start"&gt;&lt;/LayoutRow&gt;</pre
            >
          </LayoutRow>

          <LayoutRow tag="div" variant="inset-content-end" :style-class-passthrough="['example-layout', 'mbe-20']">
            <h2 class="page-heading-2">Inset Content End LayoutRow</h2>

            <p class="page-body-normal">Example inset content end</p>
            <pre class="page-body-normal">
&lt;LayoutRow tag="div" variant="inset-content-end"&gt;&lt;/LayoutRow&gt;</pre
            >
          </LayoutRow>
        </section>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: "LayoutRow component", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "LayoutRow meta tag content" }],
  bodyAttrs: {
    class: "layout-row-component",
  },
})
</script>

<style lang="css">
.layout-row-component {
  /* Add your styles here */
  .example-layout {
    background-color: var(--orange-10);
    border: 1px solid light-dark(var(--gray-10), var(--gray-4));

    .layout-row-inner {
      background-color: light-dark(var(--gray-1), var(--gray-11));
      border: 1px dashed light-dark(var(--blue-7), var(--blue-5));

      > div {
        background-color: light-dark(var(--yellow-1), var(--yellow-11));
      }
    }
  }
}
</style>
