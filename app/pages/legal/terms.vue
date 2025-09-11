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
              <div class="nav-wrapper" :style="{ '--navWrapperHeight': navWrapperHeight }">
                <details class="terms-page-nav box-rounded-medium-border" :open="showDetailsOpen">
                  <summary @click.prevent="handleDetailsToggle" class="header" ref="summaryRef">
                    {{ t("pages.legal.terms.pageContent.title") }}
                    <Icon name="bi:caret-down-fill" class="icon"></Icon>
                  </summary>
                  <hr class="divider" />
                  <ul class="link-list">
                    <li v-for="(item, index) in termOfUseData" :key="item.link" class="link-item">
                      <a
                        @click="setActiveLinkIndex(index)"
                        :href="`#${item.link}`"
                        class="link"
                        :class="{ active: activeLinkIndex === index }"
                      >
                        {{ item.title }}
                        <Icon name="material-symbols:arrow-right-alt" class="icon" />
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>

            <RenderMarkdownSections :i18n-content="termOfUseData" :style-class-passthrough="['terms-sections']" />
          </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { SectionMarkdownI18nContent, SectionMarkdownI18nData } from "@/types/i18n"
import { useBreakpoints } from "@vueuse/core"
import RenderMarkdownSections from "~/components/markdown-rendering/RenderMarkdownSections.vue"
definePageMeta({
  layout: false,
})

const { t } = useI18n()
const { renderMarkdown } = useMarkdown()

useHead({
  title: computed(() => $t("pages.legal.terms.meta.title")),
  meta: [{ name: "description", content: computed(() => $t("pages.legal.terms.meta.description")) }],
  bodyAttrs: {
    class: "terms-page",
  },
})

// interface SectionMarkdownI18nContent {
//   title?: string
//   content: string[] | { list: string[] }
// }

// interface SectionMarkdownI18nData {
//   text: string
//   link: string
//   section?: SectionMarkdownI18nContent[]
// }

const termOfUseData = useRawLocaleData<SectionMarkdownI18nData[]>("pages.legal.terms.sections", [])

const breakpoints = useBreakpoints({
  screenMobile: 414,
  screenTablet: 768,
})
const isScreenMobile = breakpoints.between("screenMobile", "screenTablet")

const activeLinkIndex = ref<number>(0)
const setActiveLinkIndex = (index: number) => {
  activeLinkIndex.value = index
}

const summaryRef = useTemplateRef<HTMLElement>("summaryRef")
const navWrapperHeight = computed(() => {
  return summaryRef.value ? `${Math.floor(summaryRef.value?.getBoundingClientRect().height)}px` : 0
})

const detailsOpen = ref(false)
const isInitialized = ref(false)

const showDetailsOpen = computed(() => {
  if (!isInitialized.value) return false
  if (!isScreenMobile.value) return true
  return detailsOpen.value
})

const handleDetailsToggle = (event: Event) => {
  if (!isScreenMobile.value) {
    event.preventDefault()
    return
  }
  detailsOpen.value = !detailsOpen.value
}

watch(isScreenMobile, (isMobile) => {
  if (isMobile) {
    detailsOpen.value = false
  }
})

onMounted(() => {
  if (isScreenMobile.value) {
    detailsOpen.value = false
  }
  isInitialized.value = true
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

      .nav-wrapper {
        position: sticky;
        top: 60px;
        height: var(--navWrapperHeight);
        min-height: 52px;
        transition: height 0.3s ease;

        @media (width >= 768px) {
          height: 100%;
        }

        .terms-page-nav {
          background-color: light-dark(var(--gray-1), var(--gray-11));
          border-radius: 8px;

          &:has([open]) .icon {
            transform: rotate(180deg);
          }

          .header {
            color: light-dark(var(--gray-7), var(--gray-3));
            padding: 2rem;
            line-height: 1;
            font-size: var(--step-5);
            font-weight: 600;

            display: flex;
            justify-content: space-between;

            list-style: none;
            &::-webkit-details-marker,
            &::marker {
              display: none;
            }

            .icon {
              display: inline-block;
              transition: transform 0.3s ease;
              transform: rotate(0deg);
              font-size: 14px;
              font-style: normal;
              font-weight: 900;
              line-height: 20px;
              @media screen and (width >= 768px) {
                display: none;
              }
            }
          }

          .divider {
            height: 2px;
            background-color: light-dark(var(--gray-7), var(--gray-8));
            border: none;
            margin-block: 0;
          }

          .link-list {
            margin-block: 8px;
            list-style-type: none;
            padding: 0;

            .link-item {
              .link {
                --_transition-duration: 250ms;
                --_transition-easing: ease-in-out;
                color: var(--tertiaryBackgroundDarkBlue);
                font-size: var(--step-4);
                font-style: normal;
                font-weight: 500;
                line-height: 1.3;
                text-decoration: none;

                display: grid;
                grid-template-columns: 1fr auto;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                transition: background-color var(--_transition-easing) var(--_transition-duration);

                .icon {
                  display: inline-block;
                  color: light-dark(var(--gray-12), var(--gray-0));

                  margin-inline-end: 8px;
                  opacity: 0;
                  transition: opacity var(--_transition-easing) var(--_transition-duration);
                }

                &:hover,
                &:focus-visible,
                &.active {
                  background-color: light-dark(var(--gray-12), var(--gray-10));

                  .icon {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
