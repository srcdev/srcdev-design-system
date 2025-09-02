<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <h1 class="page-heading-1">Switch colour scheme</h1>

          <p class="page-body-normal">Swap the colour scheme</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <TripleToggleSwitchCore v-model="colorModeVal" v-model:field-data="sampleFieldData" />
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

const sampleFieldData = <IFormMultipleOptions>{
  data: [
    {
      id: "auto",
      name: "colorModeVal",
      value: "auto",
      label: "Auto",
      icon: "material-symbols:night-sight-auto-sharp",
    },
    {
      id: "light",
      name: "colorModeVal",
      value: "light",
      label: "Light",
      icon: "radix-icons:sun",
    },
    {
      id: "dark",
      name: "colorModeVal",
      value: "dark",
      label: "Dark",
      icon: "radix-icons:moon",
    },
  ],
  total: 3,
  skip: 0,
  limit: 3,
}

const { colourScheme, setColourScheme } = useSettingsStore()

const colorModeVal = ref(colourScheme)
watch(colorModeVal, (val) => {
  setColourScheme(val as "auto" | "dark" | "light")
})
</script>

<style lang="css">
.colour-scheme-select {
  .colour-scheme-select-form {
    background-color: var(--theme-input-surface);
    border: 1px solid var(--theme-input-border);

    .select-scheme-marker-wrapper {
      .select-scheme-marker {
        &.show {
        }
      }
    }
    .select-scheme-group-wrapper {
      .select-scheme-group {
        .scheme-icon {
          color: var(--theme-icon-color);
        }
      }
    }
  }
}
</style>
