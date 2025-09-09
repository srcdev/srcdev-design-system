<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <h1 class="page-heading-2">{{ $t("pages.account.login.header") }}</h1>

          <p class="page-body-normal">{{ $t("pages.account.login.description") }}</p>
        </LayoutRow>

        <!-- GitHub OAuth Login -->
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <FormWrapper width="medium">
            <template #default>
              <ClientOnly>
                <NuxtLink
                  to="/api/auth/github"
                  icon="i-simple-icons-github"
                  label="Login with GitHub"
                  color="neutral"
                  size="xs"
                  external
                >
                  Login with GitHub
                </NuxtLink>
              </ClientOnly>
            </template>
          </FormWrapper>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <ThemeSwitcher v-model="selectedTheme" />
        </LayoutRow>

        <!-- Traditional Login Form (when not authenticated) -->
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <FormWrapper width="medium">
            <template #default>
              <ClientOnly>
                <form ref="formRef" class="form-wrapper" @submit.stop.prevent="submitForm()">
                  <div id="aria-live-message" aria-live="assertive"></div>

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <InputTextWithLabel
                        v-model="state.emailAddress"
                        type="email"
                        inputmode="email"
                        :maxlength="fieldMaxLength('email')"
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="eg. name@domain.com"
                        label="Email address"
                        :errorMessage="formErrors?.emailAddress?._errors[0] ?? ''"
                        :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.emailAddress)"
                        :required="true"
                        :styleClassPassthrough="['style-1', 'style-2']"
                        :theme="selectedTheme"
                        :size
                        :inputVariant
                      >
                        <template #left>
                          <Icon name="radix-icons:envelope-closed" class="icon" />
                        </template>
                        <template #right>
                          <Icon name="radix-icons:envelope-closed" class="icon" />
                        </template>
                      </InputTextWithLabel>
                    </template>
                  </FormField>

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <InputPasswordWithLabel
                        v-model="state.password"
                        :maxlength="fieldMaxLength('password')"
                        id="password"
                        name="password"
                        placeholder="eg. a mixture of numbers and letters"
                        label="Password"
                        :errorMessage="formErrors?.password?._errors[0] ?? ''"
                        :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.password)"
                        :required="true"
                        :styleClassPassthrough="['style-1', 'style-2']"
                        :theme="selectedTheme"
                        :size
                        :inputVariant
                      >
                        <template #right>
                          <Icon name="radix-icons:eye-open" class="icon" />
                        </template>
                      </InputPasswordWithLabel>
                    </template>
                  </FormField>

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <SingleCheckbox
                        v-model="state.terms"
                        name="terms"
                        legend="Terms and conditions"
                        :required="true"
                        :error-message="formErrors?.terms?._errors[0] ?? ''"
                        :field-has-error="Boolean(zodFormControl.submitAttempted && formErrors?.terms)"
                        :theme="selectedTheme"
                        :size
                      >
                        <template #labelContent>
                          <span class="body-normal">
                            You must agree to our
                            <NuxtLink to="/" class="link-normal">terms and conditions</NuxtLink>
                            to continue
                          </span>
                        </template>
                      </SingleCheckbox>
                    </template>
                  </FormField>

                  <FormField width="wide" :has-gutter="false">
                    <template #default>
                      <InputButtonSubmit
                        type="button"
                        :is-pending="false"
                        :readonly="zodFormControl.submitDisabled"
                        button-text="Submit"
                        :size
                        :theme="selectedTheme"
                        @click.stop.prevent="submitForm()"
                      />
                    </template>
                  </FormField>
                </form>
              </ClientOnly>
            </template>
          </FormWrapper>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod"
const { loggedIn, user, clear } = useUserSession()

definePageMeta({
  layout: false,
  middleware: ["auth"],
})

useHead({
  title: "Login", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Login to your account" }],
  bodyAttrs: {
    // class: "",
  },
})

const inputVariant = ref("underlined") // 'normal' | 'outlined' | 'underlined'
const selectedTheme = ref("primary")
const size = ref<"x-small" | "small" | "default" | "medium" | "large">("default")

/*
 * Setup forms
 */
const formSchema = reactive(
  z
    .object({
      emailAddress: z
        .string({
          required_error: "Email address is required",
        })
        .email({ message: "Invalid email address" })
        .refine((email) => email !== zodFormControl.previousState.emailAddress.value, {
          message: "This email address has already been used",
        }),
      password: z
        .string()
        .trim()
        .min(8, "Password is too short")
        .max(25, "Password is too long")
        .refine((email) => email !== zodFormControl.previousState.password.value, {
          message: "You've already used this password",
        }),
      terms: z.boolean().refine((val) => val === true, { message: "You must accept our terms" }),
    })
    .required({
      emailAddress: true,
      password: true,
      terms: true,
    })
)

type formSchema = z.infer<typeof formSchema>
const formErrors = computed<z.ZodFormattedError<formSchema> | null>(() => zodErrorObj.value)

const state = reactive({
  emailAddress: "",
  password: "",
  terms: false,
})

const formRef = ref<HTMLFormElement | null>(null)

const {
  initZodForm,
  zodFormControl,
  zodErrorObj,
  // formErrors,
  pushCustomErrors,
  doZodValidate,
  fieldMaxLength,
  scrollToFirstError,
  scrollToFormHead,
} = useZodValidation(formSchema, formRef)

initZodForm()

const submitForm = async () => {
  zodFormControl.submitAttempted = true
  if (!(await doZodValidate(state))) {
    scrollToFirstError()
    return
  }
  zodFormControl.displayLoader = true
  try {
    console.log("Form valid - post it")
    const data = await $fetch("/api/textFields", {
      method: "post",
      body: state,
      async onResponse({ response }) {
        if (response.status === 400) {
          console.log("onResponse", response)
          console.log(response.status)

          // useApiErrors(response._data.data.errors);
          // for (const [key, message] of Object.entries(response._data.data.errors)) {
          //   console.log(`${key}: ${message}`);
          //   updateErrorMessages(key, message);
          // }

          // if (error instanceof Error) {
          await pushCustomErrors(response._data, state)
          // zodFormControl.formIsValid = false;
          // }
          // zodFormControl.submitAttempted = false;
        }
        if (response.status === 200) {
          zodFormControl.submitSuccessful = true
        }
      },
    })
    console.log("3: Finished data", data)
    // return data;
  } catch (error) {
    console.warn("2: An error occured posting form data", error)
  } finally {
    zodFormControl.displayLoader = false
  }
}

watch(
  () => state,
  () => {
    // console.log('Watching state');
    doZodValidate(state)
  },
  { deep: true }
)
</script>

<style lang="css">
.auth-options {
  margin-bottom: 2rem;
  text-align: center;
}

.github-login-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: #24292f;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.github-login-btn:hover:not(:disabled) {
  background: #1c2128;
  transform: translateY(-1px);
}

.github-login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.github-login-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.divider {
  margin: 1.5rem 0;
  position: relative;
  text-align: center;
  color: var(--gray-9);
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gray-6);
}

.divider span {
  background: var(--gray-0);
  padding: 0 1rem;
  position: relative;
}

.user-info {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid var(--gray-6);
  border-radius: 0.5rem;
  background: var(--gray-1);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--gray-6);
}

.welcome-text {
  margin: 0;
  font-weight: 600;
  color: var(--gray-11);
}

.user-email {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--gray-9);
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: var(--red-9);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.logout-btn:hover {
  background: var(--red-10);
}
</style>
