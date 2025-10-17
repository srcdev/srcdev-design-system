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
          <div class="scroll-sticky-container" ref="scrollContainerRef" :style="{ 'timeline-scope': timelineScope }">
            <div ref="stickyItemsContainerRef" class="sticky-items-container">
              <NuxtImg
                v-for="(layer, index) in stickyItems"
                :key="index"
                :src="layer.src"
                :alt="layer.alt"
                width="100%"
                class="sticky-item"
                :style="{
                  'animation-timeline': index === stickyItems.length - 1 ? 'none' : `--section-${index}`,
                  'z-index': stickyItems.length - index,
                }"
              />
            </div>

            <section
              v-for="(section, index) in scrollingSection"
              :key="index"
              class="scrolling-section"
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

const stickyItems = [
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

const scrollingSection = [
  { title: "View Timeline 1" },
  { title: "View Timeline 2" },
  { title: "View Timeline 3" },
  { title: "View Timeline 4" },
  { title: "View Timeline 5" },
]

const stickyItemsContainerRef = useTemplateRef<HTMLElement | null>("stickyItemsContainerRef")
const scrollContainerRef = useTemplateRef<HTMLElement | null>("scrollContainerRef")
const timelineInset = ref("35% 35%")
const topPercent = ref("0")
const bottomPercent = ref("0")

const timelineScope = computed(() => stickyItems.map((_, i) => `--section-${i}`).join(", "))

const calculateInset = () => {
  if (!stickyItemsContainerRef.value) return

  const rect = stickyItemsContainerRef.value.getBoundingClientRect()
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

.scroll-sticky-container {
  .sticky-items-container {
    position: sticky;
    top: 50%;
    left: 100%;
    width: 50%;
    aspect-ratio: 1;
    transform: translateY(-50%);
    z-index: 10;

    @media (width >= 1024px) {
      width: 512px;
    }

    .sticky-item {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem;
      width: 100%;
    }
  }

  .scrolling-section {
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

  .sticky-item {
    animation: wipe-out 1s linear both;
    /* Runs only during section entry, synced to the sticky frame */
    animation-range: entry 0% entry 100%;
  }
}
</style>
