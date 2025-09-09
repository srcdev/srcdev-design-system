<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <h1 class="page-heading-1">Display Prompt Component</h1>

          <p class="page-body-normal">Display Prompt Component variants</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20', 'display-none']">
          <ThemeSwitcher v-model="selectedTheme" />
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20', 'display-none']">
          <DisplayPromptCore :theme="selectedTheme" :dismissible="true">
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

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20', 'display-none']">
          <DisplayPromptCore :theme="selectedTheme" :dismissible="true" :style-class-passthrough="['dark']">
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Success Prompt Title with content (Dismissable)</template>
            <template #layout-content>Dark variant.</template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20', 'display-none']">
          <DisplayPromptCore :theme="selectedTheme" :dismissible="true" :style-class-passthrough="['dark', 'outlined']">
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Success Prompt Title with content (Dismissable)</template>
            <template #layout-content>Dark + Outlined variant.</template>
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
  title: "Display Prompt Component", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Display Prompt Component" }],
  bodyAttrs: {
    // class: "",
  },
})

const selectedTheme = ref("primary")
</script>

<style lang="css"></style>
