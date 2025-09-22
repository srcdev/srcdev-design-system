<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <ContentRenderer v-if="page" :value="page" />
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first()
})

// const { data: page } = await useAsyncData(() => queryContent(route.path).findOne())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

useHead({
  title: page.value.title,
  meta: [{ name: "description", content: page.value.description }],
  bodyAttrs: { class: page.value.bodyClass },
})
</script>
