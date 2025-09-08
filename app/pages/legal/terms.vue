<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="full" :style-class-passthrough="['mbe-24']">
          <h1 class="page-heading-1">{{ $t("pages.legal.terms.header") }}</h1>

          <p class="page-body-normal-semibold">{{ $t("pages.legal.terms.subheader") }}</p>
        </LayoutRow>

        <div class="terms-content">
          <nav class="terms-page-nav">
            <header class="page-heading-2">{{ t("pages.legal.terms.pageContent.title") }}</header>
            <ul>
              <li v-for="item in termOfUseData" :key="item.link">
                <NuxtLink :to="`#${item.link}`">{{ item.title }}</NuxtLink>
              </li>
            </ul>
          </nav>

          <div>
            <section v-for="item in termOfUseData" :key="item.link" :id="item.link">
              <article v-for="(section, articleIndex) in item.section" :key="articleIndex">
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
</script>

<style lang="css">
.terms-page {
  .terms-content {
    display: grid;
    gap: 2rem;
    grid-template-columns: auto 1fr;

    .terms-page-nav {
      position: sticky;
      top: 1rem;
      align-self: start;

      header {
        font-weight: 600;
        margin-block-end: 0.5rem;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-block-end: 0.5rem;

          a {
            text-decoration: none;
            color: var(--mbe-color-link);
            font-weight: 500;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
