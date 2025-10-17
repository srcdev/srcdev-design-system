<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['banner', 'mbe-20']">
          <h2 class="page-heading-1">View Timeline Example</h2>
          <pre class="page-body-normal">timelineInset: {{ timelineInset }}</pre>
        </LayoutRow>

        <LayoutRow tag="div" variant="full">
        <div class="scroll-clip-container" ref="scrollContainerRef">
          <div ref="frameRef" class="image-frame">
            <NuxtImg
              v-for="(layer, index) in videoLayers"
              :key="index"
              :src="layer.src"
              :alt="layer.alt"
              width="100%"
              class="image-layer"
              :style="{
                'animation-timeline': index === videoLayers.length - 1 ? 'none' : `--section-${index}`,
                'z-index': videoLayers.length - index,
              }"
            />
          </div>

          <section
            v-for="(section, index) in experienceSections"
            :key="index"
            class="experience-section"
            :style="{
              'view-timeline-name': `--section-${index}`,
            }"
          >
            <h2 class="page-heading-2">{{ section.title }}</h2>
            <pre class="page-body-normal">timelineInset: {{ timelineInset }}</pre>
          </section>
        </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: "View Timeline",
  meta: [
    {
      name: "description",
      content: "View Timeline Meta description content",
    },
  ],
  bodyAttrs: {
    class: "view-timeline-page",
  },
})

const videoLayers = [
  {
    src: "/images/rotating-carousel/image-1.webp",
    alt: "Sample Image 1",
  },
  {
    src: "/images/rotating-carousel/image-2.webp",
    alt: "Sample Image 2",
  },
  {
    src: "/images/rotating-carousel/image-4.webp",
    alt: "Sample Image 4",
  },
  {
    src: "/images/rotating-carousel/image-5.webp",
    alt: "Sample Image 5",
  },
  {
    src: "/images/rotating-carousel/image-6.webp",
    alt: "Sample Image 6",
  },
]

const experienceSections = [
  { title: "View Timeline 1" },
  { title: "View Timeline 2" },
  { title: "View Timeline 3" },
  { title: "View Timeline 4" },
  { title: "View Timeline 5" },
]

const frameRef = useTemplateRef<HTMLElement | null>("frameRef")
const scrollContainerRef = useTemplateRef<HTMLElement | null>("scrollContainerRef")
const timelineInset = ref("35% 35%")

// const calculateInset = () => {
//   const el = frameRef.value
//   if (!el) return

//   const rect = el.getBoundingClientRect()
//   const vh = window.innerHeight

//   const topPercent = (rect.top / vh) * 100
//   const bottomPercent = ((vh - rect.bottom) / vh) * 100

//   timelineInset.value = `${topPercent.toFixed(2)}% ${bottomPercent.toFixed(2)}%`

//   if (!scrollContainerRef.value) return

//   scrollContainerRef.value.style.setProperty(
//     "--calculated-inset",
//     `${topPercent.toFixed(2)}% ${bottomPercent.toFixed(2)}%`
//   )
// }

const calculateInset = () => {
  const el = frameRef.value
  if (!el) return

  // Get the sticky frame's position relative to the viewport
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight

  // Compute top and bottom inset percentages relative to viewport height
  const topPercent = (rect.top / vh) * 100
  const bottomPercent = ((vh - rect.bottom) / vh) * 100

  // Update the reactive timelineInset ref (can be used in v-bind)
  timelineInset.value = `${topPercent.toFixed(2)}% ${bottomPercent.toFixed(2)}%`

  // Also update a CSS variable for use in view-timeline-inset
  if (!scrollContainerRef.value) return
  scrollContainerRef.value.style.setProperty(
    "--calculated-inset",
    `${topPercent.toFixed(2)}% ${bottomPercent.toFixed(2)}%`
  )
}

onMounted(() => {
  calculateInset()
  window.addEventListener("scroll", calculateInset)
})

onUnmounted(() => {
  window.removeEventListener("scroll", calculateInset)
})
</script>

<style lang="css">
.view-timeline-page {
  .banner {
    padding-block: 2rem;
    margin-block-end: 60rem;
  }
}

.scroll-clip-container {
  timeline-scope: --section-0, --section-1, --section-2, --section-3, --section-4;

  .image-frame {
    position: sticky;
    top: 50%;
    left: 100%;
    width: 512px;
    aspect-ratio: 1;
    transform: translateY(-50%);
    z-index: 10;

    /* timeline-scope: --section-0, --section-1, --section-2, --section-3, --section-4; */

    outline: 1px dashed red;

    .image-layer {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem;
    }
  }

  .experience-section {
    view-timeline-axis: block;
    /* view-timeline-inset: v-bind(timelineInset); */
    /* view-timeline-inset: 35% 35%; */
    view-timeline-inset: var(--calculated-inset);
    /* view-timeline-inset: 0% 0%; */

    min-height: 100vh;

    background-color: darkcyan;

    &:nth-child(odd) {
      background-color: darkgoldenrod;
    }
  }
}

@supports (animation-timeline: view()) {
  @keyframes wipe-out {
    0% {
      clip-path: inset(0 0 0% 0);
    }
    100% {
      clip-path: inset(0 0 100% 0);
    }
  }

  .image-layer {
    animation: wipe-out 1s linear both;
    animation-range: entry 0% contain 100%;
  }
}
</style>
