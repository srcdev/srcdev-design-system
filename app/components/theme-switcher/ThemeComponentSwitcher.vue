<template>
  <div class="theme-switcher">
    <form class="form-wrapper" ref="formRef">
      <div aria-live="assertive" id="aria-live-message"></div>

      <FormField v-if="selectedComponentTheme !== null" width="wide" :has-gutter="false">
        <template #default>
          <InputSelectWithLabel
            name="selectedComponentTheme"
            label="Select Form Theme"
            placeholder="Please select a theme"
            error-message=""
            :field-has-error="false"
            v-model="selectedComponentTheme"
            v-model:fieldData="themeComponentData"
            :theme="selectedFormTheme"
            input-variant="underlined"
            size="default"
          >
            <template #descriptionText>This is a descriptionText for the message input.</template>
          </InputSelectWithLabel>
        </template>
      </FormField>
    </form>
  </div>
</template>

<script setup lang="ts">
const { data: themeComponentData } = await useFetch<IFormMultipleOptions>("/api/themes-component-source")

const selectedComponentTheme = defineModel<string>()
const selectedFormTheme = computed(() => selectedComponentTheme.value || "primary")
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
}

.theme-switcher label {
  margin-right: 8px;
}

.theme-switcher select {
  padding: 4px 8px;
}
</style>
