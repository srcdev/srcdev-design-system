<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <section>
          <h1>{{ $t("pages.index.header") }}</h1>

          <p>{{ $t("pages.index.description") }}</p>
        </section>

        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <DisplayPromptCore
            theme="error"
            :dismissible="true"
            :use-local-style-overrides="true"
            :style-class-passthrough="['your-scope-class']"
          >
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Success Prompt Title with content (Dismissable)</template>
            <template #layout-content>This is prompt content, it can contain html or plain text.</template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
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
    class: "nuxt-playground",
  },
})
</script>

<style lang="css"></style>
