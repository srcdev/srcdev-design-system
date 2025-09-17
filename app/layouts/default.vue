<template>
  <div class="page-layout">
    <HeaderNavigation />

    <main id="main-content" class="main-content">
      <slot name="layout-content">Page content goes here</slot>
    </main>
    <footer id="footer" class="footer">&copy; {{ year }} Footer</footer>
  </div>
</template>

<script setup lang="ts">
// Set up canonical URL for all pages
useCanonicalUrl()

const year = computed(() => new Date().getFullYear())
</script>

<style lang="css">
.page-layout {
  display: flex;
  flex-direction: column;

  .main-content {
    background-color: var(--color-background);
    min-block-size: 75svh;
  }

  .footer {
    text-align: center;
    padding: 10px;
    /* background-color: light-dark(#f0f0f0, #333); */
  }
}
</style>
