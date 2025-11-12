import type { Meta, StoryFn } from "@nuxtjs/storybook"
import StorybookComponent from "srcdev-nuxt-components/app/components/display-toast/DisplayToast.vue"

// Custom interface for story args
interface ToastStoryArgs {
  theme: "primary" | "secondary" | "success" | "warning" | "error" | "info"
  position: "top" | "bottom"
  alignment: "left" | "center" | "right"
  fullWidth: boolean
  autoDismiss: boolean
  duration: number
  revealDuration: number
  text: string
  customIcon: string
}

export default {
  title: "Components/UI/DisplayToast",
  component: StorybookComponent,
  argTypes: {
    // Appearance Config
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      description: "Toast theme/variant",
      table: {
        category: "Appearance",
      },
    },
    position: {
      control: { type: "select" },
      options: ["top", "bottom"],
      description: "Vertical position of toast",
      table: {
        category: "Appearance",
      },
    },
    alignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "Horizontal alignment of toast",
      table: {
        category: "Appearance",
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether toast spans full width",
      table: {
        category: "Appearance",
      },
    },
    // Behavior Config
    autoDismiss: {
      control: { type: "boolean" },
      description: "Auto dismiss toast after duration",
      table: {
        category: "Behavior",
      },
    },
    duration: {
      control: { type: "range", min: 1000, max: 10000, step: 500 },
      description: "Auto dismiss duration in milliseconds",
      table: {
        category: "Behavior",
      },
    },
    revealDuration: {
      control: { type: "range", min: 100, max: 1000, step: 50 },
      description: "Animation duration for reveal/hide",
      table: {
        category: "Behavior",
      },
    },
    // Content Config
    text: {
      control: { type: "text" },
      description: "Toast message text",
      table: {
        category: "Content",
      },
    },
    customIcon: {
      control: { type: "text" },
      description: "Custom icon name (e.g., 'akar-icons:check-box')",
      table: {
        category: "Content",
      },
    },
    // Hide complex internal props
    config: {
      table: {
        disable: true,
      },
    },
    modelValue: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    theme: "primary",
    position: "top",
    alignment: "right",
    fullWidth: false,
    autoDismiss: false,
    duration: 3000,
    revealDuration: 300,
    text: "This is a toast notification message",
    customIcon: "",
  },
} as Meta<ToastStoryArgs>

const Template: StoryFn<ToastStoryArgs> = (args) => ({
  components: { StorybookComponent },
  setup() {
    const isActive = ref(false)

    // Auto-trigger toast for demo
    onMounted(() => {
      setTimeout(() => {
        isActive.value = true
      }, 500)
    })

    // Re-trigger when it closes for continuous demo
    watch(isActive, (newValue) => {
      if (!newValue) {
        setTimeout(() => {
          isActive.value = true
        }, 2000)
      }
    })

    return { args, isActive }
  },
  template: `
    <div style="position: relative; height: 200px; padding: 20px;">
      <p style="margin-bottom: 20px;">Toast will appear and demonstrate the configured behavior:</p>
      <button
        @click="isActive = true"
        style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Trigger Toast
      </button>

      <StorybookComponent
        v-model="isActive"
        :config="{
          appearance: {
            theme: args.theme,
            position: args.position,
            alignment: args.alignment,
            fullWidth: args.fullWidth
          },
          behavior: {
            autoDismiss: args.autoDismiss,
            duration: args.duration,
            revealDuration: args.revealDuration
          },
          content: {
            text: args.text,
            ...(args.customIcon && { customIcon: args.customIcon })
          },
        }"
      />
    </div>
  `,
})

export const Default = Template.bind({})

export const SuccessToast = Template.bind({})
SuccessToast.args = {
  theme: "success",
  text: "Success! Your action was completed.",
  customIcon: "akar-icons:check-box",
  autoDismiss: true,
  duration: 4000,
  position: "top",
  alignment: "right",
  fullWidth: false,
  revealDuration: 300,
}

export const ErrorToast = Template.bind({})
ErrorToast.args = {
  theme: "error",
  text: "Error! Something went wrong.",
  autoDismiss: false,
  position: "top",
  alignment: "center",
  fullWidth: false,
  duration: 3000,
  revealDuration: 300,
  customIcon: "",
}

export const BottomCenterToast = Template.bind({})
BottomCenterToast.args = {
  theme: "info",
  text: "Info message at bottom center",
  position: "bottom",
  alignment: "center",
  autoDismiss: true,
  duration: 5000,
  fullWidth: false,
  revealDuration: 300,
  customIcon: "",
}

export const FullWidthToast = Template.bind({})
FullWidthToast.args = {
  theme: "warning",
  text: "Full width warning message",
  fullWidth: true,
  position: "top",
  alignment: "left",
  autoDismiss: true,
  duration: 6000,
  revealDuration: 300,
  customIcon: "",
}
