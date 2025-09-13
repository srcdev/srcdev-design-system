<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="content" :style-class-passthrough="['mb-24']">
          <h1 class="page-heading-1">{{ $t("pages.legal.terms.header") }}</h1>

          <p class="page-body-normal-semibold">{{ $t("pages.legal.terms.subheader") }}</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="content" :style-class-passthrough="['mbe-24']">
          <div class="terms-content">
            <div class="col-1">
              <div class="mp-12">
                <button class="btn btn-primary" @click="forceExpanded = !forceExpanded">
                  Toggle forceExpanded (currently: {{ forceExpanded }})
                </button>
              </div>
              <RenderMarkdownSectionNav
                :i18n-content="navI18nData"
                :force-expanded
                :style-class-passthrough="['terms-nav']"
              />
            </div>

            <RenderMarkdownSections :i18n-content="i18nData" :style-class-passthrough="['terms-sections']" />
          </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { SectionMarkdwnI18nNav, SectionMarkdownI18nData } from "@/types/i18n"
import { useBreakpoints } from "@vueuse/core"

definePageMeta({
  layout: false,
})

useHead({
  title: computed(() => $t("pages.legal.terms.meta.title")),
  meta: [{ name: "description", content: computed(() => $t("pages.legal.terms.meta.description")) }],
  bodyAttrs: {
    class: "terms-page",
  },
})

const i18nData = useRawLocaleData<SectionMarkdownI18nData[]>("pages.legal.terms.sections", [])
const navI18nData = computed<SectionMarkdwnI18nNav[]>(() => {
  return i18nData.map((item) => ({
    sectionTitle: item.sectionTitle,
    sectionLink: item.sectionLink,
  }))
})

const forceExpanded = ref(true)
const breakpoints = useBreakpoints({
  screenMobile: 414,
  screenTablet: 768,
})
const isScreenMobile = breakpoints.smallerOrEqual("screenTablet")
watch(isScreenMobile, () => {
  forceExpanded.value = !isScreenMobile.value
})

onMounted(() => {
  if (isScreenMobile.value) {
    forceExpanded.value = false
  }
})
</script>

<style lang="css">
.terms-page {
  .terms-content {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;

    @media (width >= 768px) {
      grid-template-columns: 300px 1fr;
    }

    .col-1 {
      @media (width >= 768px) {
        height: 100%;
      }
    }
  }
}
</style>
