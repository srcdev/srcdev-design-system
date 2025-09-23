<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div class="content-wrapper">
          <ContentRenderer v-if="page" :value="page" tag="article" :prose="true" />
          <div v-else>Page not found</div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Use a more specific approach with Content v3
const { data: page } = await useAsyncData(`page:${route.path}`, async () => {
  const content = await queryCollection("content").path(route.path).first()
  return content
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

// Safe meta data handling - ensure values exist and are strings
useHead({
  title: page.value?.title || "Page",
  meta: [
    {
      name: "description",
      content: page.value?.description || "",
    },
  ],
  bodyAttrs: {
    class: page.value?.bodyClass || "content-page",
  },
})
</script>

<style scoped>
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 24px;
}
</style>
