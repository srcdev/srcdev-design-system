<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <h1>{{ $t("pages.settings.locale-switcher.header") }}</h1>

          <p>{{ $t("pages.settings.locale-switcher.description") }}</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <LocaleSwitcher />
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
  title: "Locale Switcher", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Description meta tag content" }],
  bodyAttrs: {
    // class: "",
  },
})
</script>

<style lang="css"></style>
