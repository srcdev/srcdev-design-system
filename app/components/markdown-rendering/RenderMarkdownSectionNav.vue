<template>
  <div
    class="render-markdown-section-nav"
    :class="[elementClasses]"
    :style="{ '--navWrapperHeight': navWrapperHeight }"
  >
    <ExpandingPanel
      v-model="isPanelOpen"
      :animation-duration="300"
      name="terms-nav"
      icon-size="medium"
      :force-opened="open"
      :style-class-passthrough="['details']"
    >
      <template #summary>
        {{ t("pages.legal.terms.pageContent.title") }}
      </template>
      <template #icon>
        <Icon name="bi:caret-down-fill" class="icon" />
      </template>
      <template #content>
        <ul class="link-list">
          <li v-for="(item, index) in i18nContent" :key="item.sectionLink" class="link-item">
            <NuxtLink
              @click="setActiveLinkIndex(index)"
              @keydown.enter="setActiveLinkIndex(index)"
              :href="`#${item.sectionLink}`"
              class="link"
              :class="{ active: activeLinkIndex === index }"
            >
              {{ item.sectionTitle }}
              <Icon name="material-symbols:arrow-right-alt" class="link-icon" />
            </NuxtLink>
          </li>
        </ul>
      </template>
    </ExpandingPanel>
  </div>
</template>

<script setup lang="ts">
import type { SectionMarkdwnI18nNav } from "@/types/i18n"

const props = defineProps({
  tag: {
    type: String,
    default: "nav",
    validator(value: string) {
      return ["div", "aside", "header", "footer", "nav"].includes(value)
    },
  },
  i18nContent: {
    type: Array as PropType<SectionMarkdwnI18nNav[]>,
    required: true,
  },
  forceExpanded: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const { t } = useI18n()

const { elementClasses, resetElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough)

const open = computed(() => {
  return props.forceExpanded
})

const activeLinkIndex = ref<number>(0)
const setActiveLinkIndex = (index: number) => {
  activeLinkIndex.value = index
  if (props.forceExpanded) return
  closePanel()
}

const isPanelOpen = ref(false)
const closePanel = () => {
  isPanelOpen.value = false
}

const summaryRef = useTemplateRef<HTMLElement>("summaryRef")
const navWrapperHeight = computed(() => {
  return summaryRef.value ? `${Math.floor(summaryRef.value?.getBoundingClientRect().height)}px` : 0
})

const isInitialized = ref(false)

onMounted(() => {
  isInitialized.value = true
})
</script>

<style lang="css">
.render-markdown-section-nav {
  position: sticky;
  top: 60px;
  height: var(--navWrapperHeight);
  min-height: 52px;
  transition: height 0.3s ease;

  @media (width >= 768px) {
    height: 100%;
  }

  .expanding-panel-details {
    background-color: light-dark(var(--gray-0), var(--gray-11));
    border-radius: 8px;

    .expanding-panel-summary {
      color: light-dark(var(--gray-7), var(--gray-3));
      padding: 2rem;
      line-height: 1;
      font-size: var(--step-5);
      font-weight: 600;
    }
  }
  .expanding-panel-content {
    .inner {
      .link-list {
        margin-block: 0;
        list-style-type: none;
        padding: 0;

        background-color: light-dark(var(--gray-0), var(--gray-11));

        .link-item {
          .link {
            --_transition-duration: 250ms;
            --_transition-easing: ease-in-out;
            color: light-dark(var(--gray-10), var(--gray-1));
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

            .link-icon {
              display: inline-block;
              color: light-dark(var(--gray-12), var(--gray-0));

              margin-inline-end: 8px;
              opacity: 0;
              transition: opacity var(--_transition-easing) var(--_transition-duration);
            }

            &:hover,
            &:focus-visible,
            &.active {
              background-color: light-dark(var(--gray-2), var(--gray-10));

              .link-icon {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
