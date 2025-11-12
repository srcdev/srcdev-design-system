<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <h2 class="page-heading-2">Magnetic Navigation</h2>
        </LayoutRow>

        <LayoutRow tag="div" variant="full" :style-class-passthrough="['mbe-20']">
          <MagneticNavigation :style-class-passthrough="['magnetic-navigation-demo']" />
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
  title: "Magnetic Navigation",
  meta: [
    {
      name: "description",
      content: "MagneticNavigation Meta description content",
    },
  ],
  bodyAttrs: {
    class: "magnetic-navigation-page",
  },
})
</script>

<style lang="css">
.magnetic-navigation-page {
  --_background-image: url("/images/rotating-carousel/image-2.webp");
  --_background-position: 0 0;

  background-image: var(--_background-image);
  background-size: cover;
  background-position: var(--_background-position);
  background-attachment: fixed;

  .magnetic-navigation-demo {
    &.magnetic-navigation {
      nav {
        padding: 8px;
        border-radius: 8px;

        &::before,
        &::after {
          border-radius: 10px;
        }

        &::before {
          background: rgb(0 0 0 / 0.2);
          backdrop-filter: blur(2px);
        }

        &:has(a:hover)::before,
        &:has(a:hover)::after {
          @supports (corner-shape: squircle) {
            corner-shape: squircle;
            border-radius: 50%;
          }
        }

        &:has(li:first-of-type a:hover)::before,
        &:has(li:first-of-type a:hover)::after {
          @supports (corner-shape: squircle) {
            border-radius: 16px 25% 25% 16px;
          }
        }

        &:has(li:last-of-type a:hover)::before,
        &:has(li:last-of-type a:hover)::after {
          @supports (corner-shape: squircle) {
            border-radius: 25% 16px 16px 25%;
          }
        }

        @supports (corner-shape: squircle) {
          border-radius: 8px;
          corner-shape: squircle;
        }

        > ul {
          padding: 0;
          margin: 0;
          list-style: none;
          display: flex;
          gap: 24px;

          a {
            display: block;
            padding: 1rem;
            text-decoration: none;
            color: white;
            font-size: var(--step-5);
          }
        }
      }
    }
  }
}
</style>
