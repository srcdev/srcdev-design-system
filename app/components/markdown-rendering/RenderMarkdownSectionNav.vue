<template>
  <div
    class="render-markdown-section-nav"
    :class="[elementClasses]"
    :style="{ '--navWrapperHeight': navWrapperHeight }"
  >
    <details class="details" :open>
      <summary @click="handleToggle" class="summary" ref="summaryRef">
        {{ t("pages.legal.terms.pageContent.title") }}
        <Icon name="bi:caret-down-fill" class="summary-icon"></Icon>
      </summary>
      <ul class="link-list">
        <li v-for="(item, index) in i18nContent" :key="item.sectionLink" class="link-item">
          <a
            @click="setActiveLinkIndex(index)"
            :href="`#${item.sectionLink}`"
            class="link"
            :class="{ active: activeLinkIndex === index }"
          >
            {{ item.sectionTitle }}
            <Icon name="material-symbols:arrow-right-alt" class="link-icon" />
          </a>
        </li>
      </ul>
    </details>
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

const handleToggle = (event: Event) => {
  if (props.forceExpanded) {
    event.preventDefault()
  }
}

const activeLinkIndex = ref<number>(0)
const setActiveLinkIndex = (index: number) => {
  activeLinkIndex.value = index
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

  .details {
    background-color: light-dark(var(--gray-1), var(--gray-11));
    border-radius: 8px;

    &:has([open]) .icon {
      transform: rotate(180deg);
    }

    .summary {
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

      .summary-icon {
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

    .link-list {
      margin-block: 8px;
      list-style-type: none;
      padding: 0;

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
            background-color: light-dark(var(--gray-12), var(--gray-10));

            .link-icon {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
