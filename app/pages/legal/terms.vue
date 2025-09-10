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

            <div class="terms-sections">
              <section v-for="item in termOfUseData" :key="item.link" :id="item.link" class="section">
                <article v-for="(section, articleIndex) in item.section" :key="articleIndex" class="article">
                  <h3
                    v-if="section.title"
                    :class="{
                      'section-heading': Number(articleIndex) === 0,
                      'article-heading': Number(articleIndex) > 0,
                    }"
                  >
                    {{ section.title }}
                  </h3>
                  <template v-for="(content, contentIndex) in section.content" :key="contentIndex">
                    <template v-if="Array.isArray(content)">
                      <ul>
                        <template v-for="(listItem, listIndex) in content" :key="`item-${listIndex}`">
                          <!-- Only render list items that are strings, not arrays -->
                          <li v-if="typeof listItem === 'string'" class="article-list-normal">
                            <span v-html="renderMarkdown(listItem)"></span>
                            <!-- Check if the next item is an array (nested list) and render it here -->
                            <ul v-if="getNextItemIfArray(content, listIndex)">
                              <li
                                v-for="(nestedItem, nestedIndex) in getNextItemIfArray(content, listIndex)"
                                :key="`nested-${nestedIndex}`"
                                class="article-list-normal"
                                v-html="renderMarkdown(nestedItem)"
                              ></li>
                            </ul>
                          </li>
                        </template>
                      </ul>
                    </template>
                    <p
                      v-else-if="typeof content === 'string'"
                      class="article-body-normal"
                      v-html="renderMarkdown(content)"
                    ></p>
                  </template>
                </article>
              </section>
            </div>
          </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core"
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

interface SectionContent {
  title?: string
  content: string[] | { list: string[] }
}

interface TermOfUseData {
  text: string
  link: string
  section?: SectionContent[]
}

const termOfUseData = useRawLocaleData<TermOfUseData[]>("pages.legal.terms.sections", [])

const breakpoints = useBreakpoints({
  screenMobile: 414,
  screenTablet: 768,
})
const isScreenMobile = breakpoints.between("screenMobile", "screenTablet")

const activeLinkIndex = ref<number>(0)
const setActiveLinkIndex = (index: number) => {
  activeLinkIndex.value = index
}

const getNextItemIfArray = (items: any[], currentIndex: number): any[] | null => {
  if (currentIndex + 1 < items.length && Array.isArray(items[currentIndex + 1])) {
    return items[currentIndex + 1]
  }
  return null
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

    .terms-sections {
      .section {
        margin-block-end: 3rem;
        padding: 2rem;
        background-color: light-dark(var(--gray-1), var(--gray-11));
        border-radius: 8px;

        .article {
          --_first-list-padding-start: 20px;
          --_second-list-padding-start: 36px;
          ul {
            margin-block: 24px;
            padding-inline-start: 0; /* remove built-in padding */
            list-style-type: none;
            counter-reset: item;
          }
          ul > li {
            counter-increment: item;
            position: relative;
            padding-inline-start: var(--_first-list-padding-start); /* space for the marker */
          }
          ul > li::before {
            content: counter(item) " ";
            position: absolute;
            left: 0; /* align to left edge */
            width: var(--_first-list-padding-start); /* fixed width ensures left alignment */
            text-align: left; /* markers line up neatly */
          }
          /* Nested UL */
          ul ul {
            margin-block: 8px;
            padding-inline-start: 0;
            list-style: none;
            counter-reset: itemNested;
          }
          ul ul > li {
            counter-increment: itemNested;
            position: relative;
            padding-inline-start: var(--_second-list-padding-start); /* more space for nested markers */
          }
          ul ul > li::before {
            content: "(" counter(itemNested, lower-roman) ") ";
            position: absolute;
            left: 0;
            width: var(--_second-list-padding-start); /* wide enough for (xiii) */
            text-align: left;
          }

          + .article {
            margin-block-start: 48px;
          }
        }
      }
    }
  }
}
</style>
