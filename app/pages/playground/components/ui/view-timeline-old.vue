<template>
  <div class="scroll-clip-container">
    <div class="image-frame">
      <div class="image-layer" style="animation-timeline: --section-0"></div>
      <div class="image-layer" style="animation-timeline: --section-1"></div>
      <div class="image-layer" style="animation-timeline: --section-2"></div>
      <div class="image-layer" style="animation-timeline: none"></div>
    </div>

    <section style="view-timeline-name: --section-0">Section 1</section>
    <section style="view-timeline-name: --section-1">Section 2</section>
    <section style="view-timeline-name: --section-2">Section 3</section>
    <section style="view-timeline-name: --section-3">Section 4</section>
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
    class: "view-timeline-page-old",
  },
})
</script>

<style lang="css">
.view-timeline-page-old {
  /* CSS styles */

  .banner {
    padding-block: 2rem;
    margin-block-end: 60rem;
  }

  /* container-type: inline-size; */

  .experience-section {
    view-timeline-axis: block;
    view-timeline-inset: v-bind(timelineInset);

    /* dev only styles */
    min-height: 100vh;

    &:nth-of-type(1) {
      view-timeline-name: --section-0;
    }
    &:nth-of-type(2) {
      view-timeline-name: --section-1;
    }
    &:nth-of-type(3) {
      view-timeline-name: --section-2;
    }
    &:nth-of-type(4) {
      view-timeline-name: --section-3;
    }
    &:nth-of-type(5) {
      view-timeline-name: --section-4;
    }
  }

  .scroll-clip-container {
    timeline-scope: --section-0, --section-1, --section-2, --section-3, --section-4;
    outline: 1px solid red;
    /* min-height: 600vh; */
    /* position: relative; */

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
  }

  @supports (animation-timeline: view()) {
    @keyframes wipe-out {
      0% {
        clip-path: inset(0 0 0% 0);
      } /* fully visible */
      100% {
        clip-path: inset(0 0 100% 0);
      } /* fully clipped from bottom up */
    }

    .sticky-layer {
      animation: wipe-out 1s linear both;
      animation-range: entry 0% contain 0%;
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
      animation-timeline: none;
    }
  }
}
</style>
