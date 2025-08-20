<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <section>
          <h1>{{ $t("pages.settings.locale-switcher.header") }}</h1>

          <p>{{ $t("pages.settings.locale-switcher.description") }}</p>
        </section>

        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
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
  title: "Home page", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Desciption meta tag content" }],
  bodyAttrs: {
    // class: "",
  },
})
</script>

<style lang="css"></style>
