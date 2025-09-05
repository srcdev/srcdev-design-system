<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <section>
          <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20', 'display-none']">
            <h1 class="page-heading-1">{{ $t("pages.index.header") }}</h1>

            <p>{{ $t("pages.index.description") }}</p>

            <h2 class="page-heading-2">{{ $t("pages.index.exampleI18nTitle") }}</h2>
            <pre>{{ JSON.stringify(data, null, 2) }}</pre>
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

const { locale, getLocaleMessage } = useI18n()
const allMessages = getLocaleMessage(locale.value) as Record<string, any>
const data = allMessages?.pages?.index?.exampleI18nArray
</script>

<style lang="css"></style>
