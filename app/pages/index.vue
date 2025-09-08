<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <section>
          <LayoutRow tag="div" variant="full" :style-class-passthrough="['mbe-20', 'display-none']">
            <h1 class="page-heading-1">{{ $t("pages.index.header") }}</h1>

            <p>{{ $t("pages.index.description") }}</p>
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
  title: "Home page", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Desciption meta tag content" }],
  bodyAttrs: {
    // class: "",
  },
})
</script>

<style lang="css"></style>
