import type { Meta, StoryFn } from "@nuxtjs/storybook"
import DisplayAvatarStories from "srcdev-nuxt-components/app/components/display-avatar/DisplayAvatar.vue"
import type { DisplayChipConfig } from "srcdev-nuxt-components/app/types"

const chipConfig = reactive<DisplayChipConfig>({
  size: "12px",
  maskWidth: "4px",
  offset: "2px",
  angle: "45deg",
})

export default {
  title: "Components/UI/DisplayAvatar",
  component: DisplayAvatarStories,
  argTypes: {
    chip: {
      option: ["10px", "12px", "14px", "16px"],
      control: { type: "select" },
    },
    maskWidth: {
      option: ["2px", "4px", "6px", "8px"],
      control: { type: "select" },
    },
    offset: {
      option: ["0px", "2px", "4px", "6px"],
      control: { type: "select" },
    },
    angle: {
      option: ["0deg", "45deg", "90deg", "135deg"],
      control: { type: "select" },
    },
  },
  args: {
    src: "https://github.com/srcdev.png",
    alt: "SrcDev Avatar",
    chip: chipConfig,
    styleClassPassthrough: ["test-storybook--display-avatar", "online"],
  },
} as Meta<typeof DisplayAvatarStories>

const Template: StoryFn<typeof DisplayAvatarStories> = (args) => ({
  components: { DisplayAvatarStories },
  setup() {
    return { args }
  },
  template: `
    <DisplayAvatarStories v-bind="args" />
  `,
})

export const Default = Template.bind({})
