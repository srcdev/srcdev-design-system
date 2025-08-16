<template>
  <NuxtLayout name="default">
    <template #layout-content>
      <section>
        <h1>Contact form</h1>

        <FormWrapper width="medium">
          <template #default>
            <ClientOnly>
              <form
                ref="formRef"
                class="form-wrapper"
                @submit.stop.prevent="submitForm()"
              >
                <div id="aria-live-message" aria-live="assertive" />

                <FormField width="wide" :has-gutter="false">
                  <template #default>
                    <InputTextWithLabel
                      id="givenname"
                      v-model="state.givenname"
                      type="text"
                      :maxlength="fieldMaxLength('givenname')"
                      name="givenname"
                      placeholder="eg. Joe Bloggs"
                      label="Your name"
                      :error-message="formErrors?.givenname?._errors[0] ?? ''"
                      :field-has-error="
                        Boolean(
                          zodFormControl.submitAttempted &&
                            formErrors?.givenname
                        )
                      "
                      :required="true"
                      :style-class-passthrough="['style-1', 'style-2']"
                      :theme
                      :size
                      :input-variant
                    >
                      <template #left>
                        <Icon name="radix-icons:person" class="icon" />
                      </template>
                    </InputTextWithLabel>
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="false">
                  <template #default>
                    <InputTextWithLabel
                      id="emailAddress"
                      v-model="state.emailAddress"
                      type="email"
                      inputmode="email"
                      :maxlength="fieldMaxLength('email')"
                      name="emailAddress"
                      placeholder="eg. name@domain.com"
                      label="Email address"
                      :error-message="
                        formErrors?.emailAddress?._errors[0] ?? ''
                      "
                      :field-has-error="
                        Boolean(
                          zodFormControl.submitAttempted &&
                            formErrors?.emailAddress
                        )
                      "
                      :required="true"
                      :style-class-passthrough="['style-1', 'style-2']"
                      :theme
                      :size
                      :input-variant
                    >
                      <template #description>
                        <p class="body-normal">
                          I will only use your email address to reply to you
                        </p>
                      </template>
                      <template #left>
                        <Icon name="radix-icons:envelope-closed" class="icon" />
                      </template>
                    </InputTextWithLabel>
                  </template>
                </FormField>

                <FormField
                  v-if="visitorSourceData && visitorSourceData.data !== null"
                  width="wide"
                  :has-gutter="false"
                >
                  <template #default>
                    <InputSelectWithLabel
                      v-model="state.visitorSource"
                      v-model:field-data="visitorSourceData"
                      name="visitorSource"
                      legend="How did you hear about me?"
                      :required="true"
                      label="Please select a source"
                      placeholder="Please select a source"
                      :error-message="
                        formErrors?.visitorSource?._errors[0] ?? ''
                      "
                      :field-has-error="
                        Boolean(
                          zodFormControl.submitAttempted &&
                            formErrors?.visitorSource
                        )
                      "
                      :theme
                      :size
                      :input-variant
                    >
                      <template #description>
                        <p class="label-description">
                          I'd love to know how you found about me!
                        </p>
                      </template>
                    </InputSelectWithLabel>
                  </template>
                </FormField>

                <FormField width="wide" :has-gutter="false">
                  <template #default>
                    <InputTextareaWithLabel
                      v-model="state.message"
                      :maxlength="fieldMaxLength('message')"
                      name="message"
                      placeholder="Type your message here"
                      label="Your mesage"
                      :error-message="formErrors?.message?._errors[0] ?? ''"
                      :field-has-error="
                        Boolean(
                          zodFormControl.submitAttempted && formErrors?.message
                        )
                      "
                      :required="true"
                      :style-class-passthrough="['style-1', 'style-2']"
                      :theme
                      :size
                      :input-variant
                    />
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
                      :field-has-error="
                        Boolean(
                          zodFormControl.submitAttempted && formErrors?.terms
                        )
                      "
                      :theme
                      :size
                    >
                      <template #labelContent>
                        <span class="body-normal"
                          >You must agree to our
                          <NuxtLink to="/" class="link-normal"
                            >terms and conditions</NuxtLink
                          >
                          to continue</span
                        >
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
                      :theme
                      :size
                      @click.stop.prevent="submitForm()"
                    />
                  </template>
                </FormField>
              </form>
            </ClientOnly>
          </template>
        </FormWrapper>
      </section>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { IFormMultipleOptions } from "srcdev-nuxt-forms/shared/types/types.forms";

definePageMeta({
  layout: false,
});

useHead({
  title: "Contact form", // You could also use: computed(() => $t("pages.index.title")) if you add this to your i18n files
  meta: [{ name: "description", content: "Desciption meta tag content" }],
  bodyAttrs: {
    class: "nuxt-playground",
  },
});

const { data: visitorSourceData } = await useFetch<IFormMultipleOptions>(
  "/api/visitor-source"
);
/*
 * Setup forms
 */
const theme = ref("primary");
const inputVariant = ref("underlined");
const size = ref<"x-small" | "small" | "default" | "medium" | "large">(
  "default"
);

const formSchema = reactive(
  z
    .object({
      emailAddress: z
        .string({
          required_error: "Email address is required",
        })
        .email({ message: "Invalid email address" })
        .refine(
          (email) => email !== zodFormControl.previousState.emailAddress.value,
          {
            message: "This email address has already been used",
          }
        ),
      givenname: z
        .string({
          required_error: "Your name is required",
        })
        .trim()
        .min(2, "Your name is too short")
        .max(255, "Your name is too long"),
      visitorSource: z.string().min(1, { message: "Please select an option" }),
      message: z
        .string()
        .trim()
        .min(2, "Message is too short")
        .max(255, "Message is too long"),
      terms: z.boolean().refine((val) => val === true, {
        message: "You must accept our terms",
      }),
    })
    .required({
      emailAddress: true,
      givenname: true,
      visitorSource: true,
      message: true,
      terms: true,
    })
);

type formSchema = z.infer<typeof formSchema>;
const formErrors = computed<z.ZodFormattedError<formSchema> | null>(
  () => zodErrorObj.value
);

const state = reactive({
  emailAddress: "",
  givenname: "",
  visitorSource: "",
  message: "",
  terms: false,
});

const formRef = ref<HTMLFormElement | null>(null);

const {
  initZodForm,
  zodFormControl,
  zodErrorObj,
  // formErrors,
  pushCustomErrors,
  doZodValidate,
  fieldMaxLength,
  scrollToFirstError,
  // scrollToFormHead,
} = useZodValidation(formSchema, formRef);

initZodForm();

const submitForm = async () => {
  zodFormControl.submitAttempted = true;
  if (!(await doZodValidate(state))) {
    scrollToFirstError();
    return;
  }
  zodFormControl.displayLoader = true;
  try {
    console.log("Form valid - post it");
    const data = await $fetch("/api/textFields", {
      method: "post",
      body: state,
      async onResponse({ response }) {
        if (response.status === 400) {
          console.log("onResponse", response);
          console.log(response.status);

          // useApiErrors(response._data.data.errors);
          // for (const [key, message] of Object.entries(response._data.data.errors)) {
          //   console.log(`${key}: ${message}`);
          //   updateErrorMessages(key, message);
          // }

          // if (error instanceof Error) {
          await pushCustomErrors(response._data, state);
          // zodFormControl.formIsValid = false;
          // }
          // zodFormControl.submitAttempted = false;
        }
        if (response.status === 200) {
          zodFormControl.submitSuccessful = true;
        }
      },
    });
    console.log("3: Finished data", data);
    // return data;
  } catch (error) {
    console.warn("2: An error occured posting form data", error);
  } finally {
    zodFormControl.displayLoader = false;
  }
};

watch(
  () => state,
  () => {
    // console.log('Watching state');
    doZodValidate(state);
  },
  { deep: true }
);
</script>

<style lang="css"></style>
