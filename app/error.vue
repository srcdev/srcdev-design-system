<template>
  <div>
    <NuxtLayout name="default" :style-class-passthrough="['error-page-layout']">
      <template #layout-content>
        <LayoutRow tag="div" variant="full-width" :style-class-passthrough="['error-page-content']">
          <div class="error-container">
            <!-- Error Icon -->
            <div class="error-icon">
              <Icon :name="errorIcon" class="error-icon-svg" aria-hidden="true" />
            </div>

            <!-- Error Code -->
            <h1 class="error-code">{{ error.statusCode }}</h1>

            <!-- Error Title -->
            <h2 class="error-title">{{ errorTitle }}</h2>

            <!-- Error Description -->
            <p class="error-description">{{ errorDescription }}</p>

            <!-- Action Buttons -->
            <div class="error-actions">
              <NuxtLink
                :to="localePath('/')"
                :external="true"
                class="button primary error-button"
                :aria-label="$t('errors.actions.goHome')"
              >
                <Icon name="material-symbols:home" class="button-icon" />
                {{ $t("errors.actions.goHome") }}
              </NuxtLink>

              <button
                @click="handleRetry"
                class="button secondary error-button"
                :aria-label="$t('errors.actions.tryAgain')"
              >
                <Icon name="material-symbols:refresh" class="button-icon" />
                {{ $t("errors.actions.tryAgain") }}
              </button>
            </div>

            <!-- Contact Information for Server Errors -->
            <div v-if="error.statusCode >= 500" class="error-contact">
              <p class="error-contact-text">{{ $t("errors.contact.text") }}</p>
              <NuxtLink :to="localePath('/contact')" class="error-contact-link">
                {{ $t("errors.contact.link") }}
              </NuxtLink>
            </div>
          </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
interface NuxtError {
  statusCode: number
  statusMessage: string
  message?: string
  stack?: string
}

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

// Computed properties for error display
const errorIcon = computed(() => {
  const code = props.error.statusCode
  if (code === 404) return "material-symbols:search-off"
  if (code >= 500) return "material-symbols:error"
  return "material-symbols:warning"
})

const errorTitle = computed(() => {
  const code = props.error.statusCode
  if (code === 404) return t("errors.404.title")
  if (code === 500) return t("errors.500.title")
  if (code >= 500) return t("errors.serverError.title")
  return t("errors.general.title")
})

const errorDescription = computed(() => {
  const code = props.error.statusCode
  if (code === 404) return t("errors.404.description")
  if (code === 500) return t("errors.500.description")
  if (code >= 500) return t("errors.serverError.description")
  return t("errors.general.description")
})

const showAdditionalHelp = computed(() => {
  return props.error.statusCode === 404 || props.error.statusCode >= 500
})

const additionalHelpText = computed(() => {
  const code = props.error.statusCode
  if (code === 404) return t("errors.404.help")
  if (code >= 500) return t("errors.serverError.help")
  return ""
})

const helpSuggestions = computed(() => {
  const code = props.error.statusCode
  if (code === 404) {
    return [
      t("errors.404.suggestions.checkUrl"),
      t("errors.404.suggestions.useNavigation"),
      t("errors.404.suggestions.searchContent"),
    ]
  }
  if (code >= 500) {
    return [
      t("errors.serverError.suggestions.refresh"),
      t("errors.serverError.suggestions.wait"),
      t("errors.serverError.suggestions.contact"),
    ]
  }
  return []
})

// Action handlers
const handleRetry = () => {
  // Clear the error and try to reload
  clearError({ redirect: useRoute().fullPath })
}

// Set page metadata
useHead({
  title: computed(() => `${props.error.statusCode} - ${errorTitle.value}`),
  meta: [
    {
      name: "description",
      content: computed(() => errorDescription.value),
    },
  ],
  bodyAttrs: {
    class: `error-page error-${props.error.statusCode}`,
  },
})

// Log error for debugging (only in development)
if (process.dev) {
  console.error("Error Page:", {
    statusCode: props.error.statusCode,
    statusMessage: props.error.statusMessage,
    message: props.error.message,
  })
}
</script>

<style lang="css">
.error-page-layout {
  .main-content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    .error-page-content {
      .layout-row-inner {
        display: grid;
        place-content: center;
      }

      .error-container {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }

  .error-icon {
    margin-bottom: 1.5rem;
  }

  .error-icon-svg {
    width: 4rem;
    height: 4rem;
    color: var(--color-error, #dc2626);
  }

  .error-code {
    font-size: 4rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: var(--color-text-primary);
    line-height: 1;
  }

  .error-title {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: var(--color-text-primary);
  }

  .error-description {
    font-size: 1.125rem;
    margin: 0 0 2rem 0;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .error-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .button.primary {
    background-color: var(--color-primary, #3b82f6);
    color: white;
  }

  .button.primary:hover {
    background-color: var(--color-primary-hover, #2563eb);
  }

  .button.secondary {
    background-color: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border, #e5e7eb);
  }

  .button.secondary:hover {
    background-color: var(--color-background-subtle, #f9fafb);
  }

  .button-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .error-contact {
    padding-top: 2rem;
    border-top: 1px solid var(--color-border, #e5e7eb);
  }

  .error-contact-text {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-secondary);
  }

  .error-contact-link {
    color: var(--color-primary, #3b82f6);
    text-decoration: underline;
    font-weight: 500;
  }

  .error-contact-link:hover {
    color: var(--color-primary-hover, #2563eb);
  }

  /* Responsive Design */
  @media (max-width: 640px) {
    .error-code {
      font-size: 3rem;
    }

    .error-title {
      font-size: 1.5rem;
    }

    .error-actions {
      flex-direction: column;
      align-items: center;
    }

    .error-button {
      width: 100%;
      max-width: 200px;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .button.secondary {
      border-color: var(--color-border-dark, #374151);
    }

    .button.secondary:hover {
      background-color: var(--color-background-subtle-dark, #1f2937);
    }
  }
}
</style>
