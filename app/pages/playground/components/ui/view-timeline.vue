<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full">
          <div class="scroll-clip-container">
            <div class="sticky-frame" ref="stickyContainerRef">
              <div class="sticky-layer">
                <NuxtImg
                  src="/images/rotating-carousel/image-1.webp"
                  width="100%"
                  alt="Sample Image 1"
                  class="rounded-lg shadow-lg"
                />
              </div>
              <div class="sticky-layer">
                <NuxtImg
                  src="/images/rotating-carousel/image-2.webp"
                  width="100%"
                  alt="Sample Image 1"
                  class="rounded-lg shadow-lg"
                />
              </div>
              <div class="sticky-layer">
                <NuxtImg
                  src="/images/rotating-carousel/image-4.webp"
                  width="100%"
                  alt="Sample Image 1"
                  class="rounded-lg shadow-lg"
                />
              </div>
              <div class="sticky-layer">
                <NuxtImg
                  src="/images/rotating-carousel/image-5.webp"
                  width="100%"
                  alt="Sample Image 1"
                  class="rounded-lg shadow-lg"
                />
              </div>
              <div class="sticky-layer">
                <NuxtImg
                  src="/images/rotating-carousel/image-6.webp"
                  width="100%"
                  alt="Sample Image 1"
                  class="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <section class="experience-section">
              <LayoutRow tag="div" variant="full-width">
                <h2 class="page-heading-2">View Timeline 1</h2>
              </LayoutRow>
            </section>

            <section class="experience-section">
              <LayoutRow tag="div" variant="full-width">
                <h2 class="page-heading-2">View Timeline 2</h2>
              </LayoutRow>
            </section>

            <section class="experience-section">
              <LayoutRow tag="div" variant="full-width">
                <h2 class="page-heading-2">View Timeline 3</h2>
              </LayoutRow>
            </section>

            <section class="experience-section">
              <LayoutRow tag="div" variant="full-width">
                <h2 class="page-heading-2">View Timeline 4</h2>
              </LayoutRow>
            </section>

            <section class="experience-section">
              <LayoutRow tag="div" variant="full-width">
                <h2 class="page-heading-2">View Timeline 5</h2>
              </LayoutRow>
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

const stickyContainerRef = useTemplateRef<HTMLElement | null>("stickyContainerRef")
const timelineInset = ref("35% 35%")

const calculateInset = () => {
  const el = stickyContainerRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight

  const topPercent = (rect.top / vh) * 100
  const bottomPercent = ((vh - rect.bottom) / vh) * 100

  timelineInset.value = `${topPercent.toFixed(2)}% ${bottomPercent.toFixed(2)}%`
}

onMounted(() => {
  calculateInset()
  window.addEventListener("resize", calculateInset)
})

onUnmounted(() => {
  window.removeEventListener("resize", calculateInset)
})
</script>

<style lang="css">
.view-timeline-page {
  /* CSS styles */

  /* container-type: inline-size; */

  .scroll-clip-container {
    /* min-height: 400svh; */
  }
}

.scroll-clip-container {
  timeline-scope: --section-1, --section-2, --section-3, --section-4, --section-5;
  outline: 1px solid red;
  min-height: 600vh; /* Ensure enough scroll height */

  .sticky-frame {
    position: sticky;
    top: 50%;
    left: 50%;
    width: 512px;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    z-index: 10;

    .sticky-layer {
      position: absolute;
      inset: 0;
      border-radius: 0.5rem; /* Match rounded-lg */
      overflow: hidden;
    }
  }

  .experience-section {
    view-timeline-axis: block;
    view-timeline-inset: v-bind(timelineInset);

    /* dev only styles */
    min-height: 100vh;

    &:nth-child(2) {
      view-timeline-name: --section-1;
    }
    &:nth-child(3) {
      view-timeline-name: --section-2;
    }
    &:nth-child(4) {
      view-timeline-name: --section-3;
    }
    &:nth-child(5) {
      view-timeline-name: --section-4;
    }
    &:nth-child(6) {
      view-timeline-name: --section-5;
    }
  }
}

@supports (animation-timeline: view()) {
  @keyframes wipe-out {
    0% {
      clip-path: inset(0 0 0% 0);
      opacity: 1;
    } /* fully visible */
    100% {
      clip-path: inset(0 0 100% 0);
      opacity: 0;
    } /* fully clipped from bottom up */
  }

  .sticky-layer {
    animation: wipe-out linear both;
    animation-range: entry 0% exit 100%;
  }

  /* Each layer clips away when the corresponding section enters viewport */
  .sticky-layer:nth-child(1) {
    animation-timeline: --section-1;
  }
  .sticky-layer:nth-child(2) {
    animation-timeline: --section-2;
  }
  .sticky-layer:nth-child(3) {
    animation-timeline: --section-3;
  }
  .sticky-layer:nth-child(4) {
    animation-timeline: --section-4;
  }
  .sticky-layer:nth-child(5) {
    animation-timeline: --section-5;
  }
}
</style>
