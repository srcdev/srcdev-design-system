<template>
  <NuxtLink :to :class="[elementClasses]"><slot></slot></NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  styleClassPassthrough: {
    type: [String, Array] as PropType<string | string[]>,
    default: () => [],
  },
})

const { elementClasses, resetElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough)

watch(
  () => props.styleClassPassthrough,
  () => {
    resetElementClasses(props.styleClassPassthrough)
  }
)
</script>
