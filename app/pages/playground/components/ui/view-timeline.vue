<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['banner', 'mbe-20']">
          <h2 class="page-heading-1">View Timeline Example</h2>
          <pre class="page-body-normal">timelineInset: {{ timelineInset }}</pre>
          <pre class="page-body-normal">topPercent: {{ topPercent }}</pre>
          <pre class="page-body-normal">bottomPercent: {{ bottomPercent }}</pre>
        </LayoutRow>

        <LayoutRow tag="div" variant="full">
          <div class="scroll-clip-container" ref="scrollContainerRef" :style="{ 'timeline-scope': timelineScope }">
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
              <pre class="page-body-normal">topPercent: {{ topPercent }}</pre>
              <pre class="page-body-normal">bottomPercent: {{ bottomPercent }}</pre>
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
const topPercent = ref("0")
const bottomPercent = ref("0")

const timelineScope = computed(() => videoLayers.map((_, i) => `--section-${i}`).join(", "))

const calculateInset = () => {
  if (!frameRef.value) return

  const rect = frameRef.value.getBoundingClientRect()
  const innerHeight = window.innerHeight

  topPercent.value = ((rect.top / innerHeight) * 100).toFixed(2)
  bottomPercent.value = (((innerHeight - rect.bottom) / innerHeight) * 100).toFixed(2)

  timelineInset.value = `${topPercent.value}% ${bottomPercent.value}%`

  if (!scrollContainerRef.value) return
  scrollContainerRef.value.style.setProperty("--calculated-inset", timelineInset.value)
}

// Throttle scroll handler using requestAnimationFrame
let rafId: number | null = null
const onScroll = () => {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    calculateInset()
    rafId = null
  })
}

onMounted(() => {
  calculateInset()
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
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
  .image-frame {
    position: sticky;
    top: 50%;
    left: 100%;
    width: 512px;
    aspect-ratio: 1;
    transform: translateY(-50%);
    z-index: 10;

    .image-layer {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem;
    }
  }

  .experience-section {
    view-timeline-axis: block;
    view-timeline-inset: var(--calculated-inset);

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
    /* Runs only during section entry, synced to the sticky frame */
    animation-range: entry 0% entry 100%;
  }
}
</style>
