<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full" :style-class-passthrough="['mbe-24']">
          <h1 class="page-heading-1">{{ $t("pages.legal.terms.header") }}</h1>

          <p class="page-body-normal-semibold">{{ $t("pages.legal.terms.subheader") }}</p>
        </LayoutRow>

        <div class="terms-content">
          <div class="col-1">
            <nav class="terms-page-nav">
              <header class="header page-heading-3">{{ t("pages.legal.terms.pageContent.title") }}</header>
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
            </nav>
          </div>

          <div class="terms-sections">
            <section v-for="item in termOfUseData" :key="item.link" :id="item.link" class="section">
              <article v-for="(section, articleIndex) in item.section" :key="articleIndex" class="article">
                <h3
                  :class="{ 'page-heading-2': Number(articleIndex) === 0, 'page-heading-3': Number(articleIndex) > 0 }"
                >
                  {{ section.title }}
                </h3>

                <div v-for="(content, contentIndex) in section.content" :key="contentIndex">
                  <ul v-if="Array.isArray(content)">
                    <li
                      v-for="(listItem, listIndex) in content"
                      :key="listIndex"
                      v-html="renderMarkdown(listItem)"
                    ></li>
                  </ul>
                  <p v-else-if="typeof content === 'string'" v-html="renderMarkdown(content)"></p>
                </div>
              </article>
            </section>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
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

const activeLinkIndex = ref<number>(0)
const setActiveLinkIndex = (index: number) => {
  activeLinkIndex.value = index
}
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

      .terms-page-nav {
        position: sticky;
        top: 60px;
        background-color: light-dark(var(--gray-1), var(--gray-11));
        border-radius: 8px;

        .header {
          color: light-dark(var(--gray-7), var(--gray-3));
          padding: 2rem;
          line-height: 1;
        }

        .divider {
          height: 2px;
          background-color: light-dark(var(--gray-7), var(--gray-3));
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
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 1;
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

    .terms-sections {
      .section {
        margin-block-end: 3rem;
        padding: 2rem;
        background-color: light-dark(var(--gray-1), var(--gray-11));
        border-radius: 8px;

        .article {
          ul {
            list-style: decimal;
            padding-inline-start: 1.5rem;
            margin-block-end: 1rem;

            li {
              margin-block-end: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
