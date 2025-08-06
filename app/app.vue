<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// Set up i18n HTML attributes
const { locale, locales, t } = useI18n();

// Get current locale data
const currentLocale = computed(() => {
  return locales.value.find((l) => l.code === locale.value);
});

// Set HTML attributes and title template using useHead
useHead({
  htmlAttrs: {
    lang: computed(
      () => currentLocale.value?.language || currentLocale.value?.code || "en"
    ),
    dir: computed(() => currentLocale.value?.dir || "ltr"),
  },
  titleTemplate: computed(() => `%s | ${t("global.siteName")}`), // Default for title even with rtl direction
  // titleTemplate: computed(() => {
  //   const siteName = t("global.siteName");
  //   const isRTL = currentLocale.value?.dir === "rtl";

  //   // For RTL languages, you might want to swap the order
  //   return isRTL ? `${siteName} | %s` : `%s | ${siteName}`;
  // }),
});
</script>

<style lang="css">
:root {
  -writing-mode: auto;
}
</style>
