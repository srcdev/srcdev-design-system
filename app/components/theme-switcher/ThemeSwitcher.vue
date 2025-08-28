<template>
  <div class="theme-switcher">
    <form class="form-wrapper" ref="formRef">
      <div aria-live="assertive" id="aria-live-message"></div>

      <FormField v-if="selectedTheme !== null" width="wide" :has-gutter="false">
        <template #default>
          <InputSelectWithLabel
            name="selectedTheme"
            label="Select Theme"
            placeholder="Please select a theme"
            error-message=""
            :field-has-error="false"
            v-model="selectedTheme"
            v-model:fieldData="themeData"
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
const { data: themeData } = await useFetch<IFormMultipleOptions>("/api/themes-source")

const selectedTheme = defineModel<string>()
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
