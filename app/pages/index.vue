<template>
  <NuxtLayout name="default">
    <template #layout-content>
      <section class="lang-demo">
        <h1>{{ $t("pages.index.header") }}</h1>

        <p>{{ $t("pages.index.description") }}</p>
      </section>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "Home page", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Desciption meta tag content" }],
  bodyAttrs: {
    class: "nuxt-playground",
  },
});
</script>

<style lang="css">
.lang-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  overflow: hidden;
  width: 75%;
  border: 3px double black;
  background-color: antiquewhite;

  border-radius: 20px;
  border-end-start-radius: 0;

  h1 {
    font-size: var(--step-7);
    background-color: lightgray;

    text-align: end;
  }

  p {
    font-size: var(--step-4);
    background-color: lightgoldenrodyellow;
  }

  h1,
  p {
    color: light-dark(#000, #333);
    margin-inline: 2rem 5rem;
  }
}
</style>
