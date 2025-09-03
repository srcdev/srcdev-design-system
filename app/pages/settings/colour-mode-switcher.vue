<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <h1 class="page-heading-1">Switch colour scheme</h1>

          <p class="page-body-normal">Swap the colour scheme</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['mbe-20']">
          <TripleToggleSwitchCore
            v-model="colorModeVal"
            v-model:field-data="sampleFieldData"
            :style-class-passthrough="['colour-scheme-select']"
          />
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
  &.triple-toggle-switch {
    --_form-border-colour: var(--theme-form-radio-border);

    --_form-outline-colour: var(--theme-form-radio-outline);

    --_form-border-radius: calc(
      (var(--_scheme-icon-font-size) / 2) + var(--form-element-border-width) + var(--form-element-outline-width) +
        var(--_form-padding) + var(--_select-scheme-group-padding) + var(--form-element-border-width) +
        var(--form-element-outline-width)
    );

    --_form-items-gap: 0.4rem;
    --_form-padding: 0.2rem;

    --_select-scheme-group-background-color: var(--theme-form-checkbox-bg);
    --_select-scheme-group-background-image: none;
    --_select-scheme-group-padding: 0.5rem;
    --_scheme-icon-font-size: 2rem;
    --_scheme-icon-colour: black;

    &:has(input[value="auto"]:checked) {
      --_select-scheme-group-background-color: transparent;
      --_select-scheme-group-background-image: radial-gradient(
        circle,
        rgb(66, 180, 58) 0%,
        rgb(17, 199, 0) 27%,
        rgb(8, 117, 3) 100%
      );
    }

    &:has(input[value="light"]:checked) {
      --_select-scheme-group-background-color: transparent;
      --_select-scheme-group-background-image: radial-gradient(
        circle,
        rgba(180, 58, 91, 1) 0%,
        rgba(253, 29, 29, 1) 27%,
        rgba(252, 176, 69, 1) 100%
      );
    }

    &:has(input[value="dark"]:checked) {
      --_select-scheme-group-background-color: transparent;
      --_select-scheme-group-background-image: radial-gradient(
        circle,
        rgb(50, 20, 25) 0%,
        rgb(0, 0, 0) 27%,
        rgb(100, 100, 100) 100%
      );
    }

    .triple-toggle-switch-wrapper {
      background-color: var(--theme-input-surface);
      border: var(--form-element-border-width) solid var(--theme-input-border);
      outline: var(--form-element-outline-width) solid var(--theme-input-outline);
      border-radius: var(--_form-border-radius);
      padding: var(--_form-padding);

      &:has(input:focus-visible) {
        outline: var(--form-element-outline-width) solid var(--theme-input-outline-hover);
        outline-offset: 0.2rem;
      }

      .selected-option-marker-wrapper {
        .selected-option-marker {
          background-color: var(--_select-scheme-group-background-color);
          background-image: var(--_select-scheme-group-background-image);
          border: var(--form-element-border-width) solid light-dark(var(--gray-12), var(--gray-0));
        }
      }

      .option-group-wrapper {
        gap: var(--_form-items-gap);
        position: relative;

        .option-group {
          border: var(--form-element-border-width) solid light-dark(#00000025, #ffffff50);
          outline: var(--form-element-outline-width) solid transparent;
          border-radius: 50%;
          padding: var(--_select-scheme-group-padding);

          &:has(.option-icon:hover) {
            outline: var(--form-element-outline-width) solid light-dark(var(--gray-12), var(--gray-0));
          }

          &:has(input:focus-visible) {
            outline: var(--form-element-outline-width) solid var(--theme-input-outline-hover);
            outline-offset: 0.2rem;
          }

          .option-icon {
            color: light-dark(var(--gray-12), var(--gray-0));
          }
        }
      }
    }
  }
}
</style>
