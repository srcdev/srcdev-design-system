<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <h1 class="page-heading-1">Display Prompt Component</h1>

          <p class="page-body-normal">Display Prompt Component variants</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout">
          <ThemeComponentSwitcher v-model="selectedComponentTheme" />
        </LayoutRow>

        <LayoutRow tag="div" variant="popout">
          <FormWrapper width="medium">
            <form ref="formRef" class="form-wrapper pbe-0" @submit.stop.prevent>
              <FormField :has-gutter="false">
                <template #default>
                  <SingleCheckbox
                    v-model="displayContent"
                    name="displayContent"
                    legend="Toggle content"
                    :theme="selectedComponentTheme"
                    errorMessage=""
                  >
                    <template #labelContent>
                      <span class="body-normal">Toggle content</span>
                    </template>
                  </SingleCheckbox>
                </template>
              </FormField>

              <FormField :has-gutter="false">
                <template #default>
                  <SingleCheckbox
                    v-model="dismissible"
                    name="dismissible"
                    legend="Toggle dismissible button"
                    :theme="selectedComponentTheme"
                    errorMessage=""
                  >
                    <template #labelContent>
                      <span class="body-normal">Toggle dismissible button</span>
                    </template>
                  </SingleCheckbox>
                </template>
              </FormField>
            </form>
          </FormWrapper>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20']">
          <DisplayPromptCore :theme="selectedComponentTheme" :dismissible>
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Prompt Default (Outlined)</template>
            <template v-if="displayContent" #content>
              This is prompt content, it can contain html or plain text.
            </template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20']">
          <DisplayPromptCore :theme="selectedComponentTheme" :dismissible :style-class-passthrough="['outlined']">
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Prompt Default (No outline)</template>
            <template v-if="displayContent" #content>
              This is prompt content, it can contain html or plain text.
            </template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20']">
          <DisplayPromptCore
            :theme="selectedComponentTheme"
            :dismissible
            :style-class-passthrough="['dark', 'outlined']"
          >
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Prompt Dark (Outlined)</template>
            <template v-if="displayContent" #content>
              This is prompt content, it can contain html or plain text.
            </template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mbe-20']">
          <DisplayPromptCore :theme="selectedComponentTheme" :dismissible :style-class-passthrough="['dark']">
            <template #customDecoratorIcon>
              <Icon name="akar-icons:info" class="icon" />
            </template>
            <template #title>Prompt Dark (No outline)</template>
            <template v-if="displayContent" #content>
              This is prompt content, it can contain html or plain text.
            </template>
            <template #customCloseIcon>
              <Icon name="material-symbols:close-small" class="icon" />
            </template>
            <template #customTitle>Dismiss</template>
          </DisplayPromptCore>
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
  title: "Display Prompt Component", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Display Prompt Component" }],
  bodyAttrs: {
    class: "display-prompt-page",
  },
})

const selectedComponentTheme = ref("primary")
const displayContent = ref(true)
const dismissible = ref(true)
</script>

<style lang="css">
.display-prompt-page {
  form {
    label {
      display: grid;
      grid-template-columns: 20px auto;
      align-items: center;
      gap: 18px;
      margin-bottom: 12px;
    }
  }

  .form-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    .form-field {
      margin-block: 0;
    }
  }
}
</style>
