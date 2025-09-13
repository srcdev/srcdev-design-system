<template>
  <component :is="tag" class="render-markdown-sections" :class="[elementClasses]">
    <section v-for="item in i18nContent" :key="item.sectionLink" :aria-labelledby="item.sectionLink" class="section">
      <article v-for="(section, articleIndex) in item.section" :key="articleIndex" class="article">
        <component
          :is="getHeadingTag(item.section, articleIndex)"
          v-if="section.title"
          :class="getHeadingClass(item.section, articleIndex)"
          :id="item.sectionLink"
        >
          {{ section.title }}
        </component>

        <template v-for="(content, contentIndex) in section.content" :key="contentIndex">
          <template v-if="Array.isArray(content)">
            <ul class="markdown-list-top">
              <template v-for="(listItem, listIndex) in content" :key="`item-${listIndex}`">
                <!-- Only render list items that are strings, not arrays -->
                <li v-if="typeof listItem === 'string'" class="markdown-list-top-item article-list-normal">
                  <span v-html="renderMarkdown(listItem)"></span>
                  <!-- Check if the next item is an array (nested list) and render it here -->
                  <ul v-if="getNextItemIfArray(content, listIndex)" class="markdown-list-nested">
                    <li
                      v-for="(nestedItem, nestedIndex) in getNextItemIfArray(content, listIndex)"
                      :key="`nested-${nestedIndex}`"
                      class="markdown-list-nested-item article-list-normal"
                      v-html="renderMarkdown(nestedItem)"
                    ></li>
                  </ul>
                </li>
              </template>
            </ul>
          </template>
          <p v-else-if="typeof content === 'string'" class="article-body-normal" v-html="renderMarkdown(content)"></p>
        </template>
      </article>
    </section>
  </component>
</template>

<script setup lang="ts">
import type { SectionMarkdownI18nContent, SectionMarkdownI18nData } from "@/types/i18n"

const props = defineProps({
  tag: {
    type: String,
    default: "div",
    validator(value: string) {
      return ["div", "aside", "header", "footer", "nav"].includes(value)
    },
  },
  i18nContent: {
    type: Array as PropType<SectionMarkdownI18nData[]>,
    required: true,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const { elementClasses, resetElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough)
const { renderMarkdown } = useMarkdown()

const getNextItemIfArray = (items: any[], currentIndex: number): any[] | null => {
  if (currentIndex + 1 < items.length && Array.isArray(items[currentIndex + 1])) {
    return items[currentIndex + 1]
  }
  return null
}

const getHeadingTag = (sections: SectionMarkdownI18nContent[] | undefined, currentIndex: number): string => {
  if (!sections) return "h3" // No sections, default to h3

  // Find the first section with a title to determine if we should start with h2 or h3
  const firstTitleIndex = sections.findIndex((section) => section.title)

  if (firstTitleIndex === -1) return "h3" // No titles found, default to h3

  return currentIndex === firstTitleIndex ? "h2" : "h3"
}

const getHeadingClass = (sections: SectionMarkdownI18nContent[] | undefined, currentIndex: number): string => {
  if (!sections) return "article-heading" // No sections, default to article-heading

  // Find the first section with a title to determine the class
  const firstTitleIndex = sections.findIndex((section) => section.title)

  if (firstTitleIndex === -1) return "article-heading" // No titles found, default to article-heading

  return currentIndex === firstTitleIndex ? "section-heading" : "article-heading"
}

watch(
  () => props.styleClassPassthrough,
  () => {
    resetElementClasses(props.styleClassPassthrough)
  }
)
</script>

<style lang="css">
.render-markdown-sections {
  .section {
    margin-block-end: 3rem;
    padding: 2rem;
    background-color: light-dark(var(--gray-1), var(--gray-11));
    border-radius: 8px;

    .article {
      --_first-list-padding-start: 20px;
      --_second-list-padding-start: 36px;

      .markdown-list-top {
        margin-block: 24px;
        padding-inline-start: 0;
        list-style-type: none;
        counter-reset: item;
      }
      .markdown-list-top {
        .markdown-list-top-item {
          counter-increment: item;
          position: relative;
          padding-inline-start: var(--_first-list-padding-start);

          &::before {
            content: counter(item) " ";
            position: absolute;
            left: 0;
            width: var(--_first-list-padding-start);
            text-align: left;
          }
        }

        .markdown-list-nested {
          margin-block: 8px;
          padding-inline-start: 0;
          list-style: none;
          counter-reset: itemNested;

          .markdown-list-nested-item {
            counter-increment: itemNested;
            position: relative;
            padding-inline-start: var(--_second-list-padding-start);

            &::before {
              content: "(" counter(itemNested, lower-roman) ") ";
              position: absolute;
              left: 0;
              width: var(--_second-list-padding-start);
              text-align: left;
            }
          }
        }
      }

      + .article {
        margin-block-start: 48px;
      }
    }
  }
}
</style>
