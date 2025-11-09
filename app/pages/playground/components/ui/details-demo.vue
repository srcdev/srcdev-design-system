<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :styleClassPassthrough="['mbe-20', 'details-demo']">
          <h1 class="page-heading-2">Accordian</h1>
          <p>Any item open and/closed</p>

          <details class="details" name="morph">
            <summary class="summary">
              <span>What is design engineering?</span>
            </summary>
            <div class="content mb-12 p-12">
              <p class="m-12">Where design intuition meets code execution</p>
              <p class="m-12">enabling you to see UI problems and build solutions from the ground up.</p>
            </div>
          </details>

          <details class="details" name="morph">
            <summary class="summary">
              <span>What is design engineering?</span>
            </summary>
            <div class="content mb-12 p-12">
              <p class="m-12">Where design intuition meets code execution</p>
              <p class="m-12">enabling you to see UI problems and build solutions from the ground up.</p>
            </div>
          </details>

          <details class="details" name="morph">
            <summary class="summary">
              <span>What is design engineering?</span>
            </summary>
            <div class="content mb-12 p-12">
              <p class="m-12">Where design intuition meets code execution</p>
              <p class="m-12">enabling you to see UI problems and build solutions from the ground up.</p>
            </div>
          </details>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: "Display Details",
  meta: [{ name: "description", content: "Display Demo" }],
  bodyAttrs: {
    class: "details-demo-page",
  },
})
</script>

<style lang="css">
.details-demo {
  --duration: 1000ms;
  --ease: ease;

  .details {
    &::details-content {
      height: 0;
      transition-property: content-visibility, height;
      transition-behavior: allow-discrete;
      transition-duration: var(--duration);
      transition-timing-function: var(--ease);
      interpolate-size: allow-keywords;
      overflow: hidden;
    }

    .summary {
      padding: 6px 12px;
    }
  }

  .content {
    background-color: darkblue;
  }

  @supports (interpolate-size: allow-keywords) {
    .details[open]::details-content {
      height: fit-content;
    }
  }
}
</style>
