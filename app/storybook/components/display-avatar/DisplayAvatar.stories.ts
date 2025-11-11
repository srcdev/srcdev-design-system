import type { Meta, StoryFn } from "@nuxtjs/storybook"
import DisplayAvatarStories from "srcdev-nuxt-components/app/components/display-avatar/DisplayAvatar.vue"

export default {
  title: "Components/UI/DisplayAvatar",
  component: DisplayAvatarStories,
  argTypes: {
    src: {
      control: { type: "text" },
      description: "Avatar image source URL",
      table: {
        category: "Avatar",
      },
    },
    alt: {
      control: { type: "text" },
      description: "Alternative text for the avatar image",
      table: {
        category: "Avatar",
      },
    },
    chipSize: {
      options: ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "24px"],
      control: { type: "select" },
      description: "Size of the chip",
      table: {
        category: "Chip Configuration",
      },
    },
    chipMaskWidth: {
      options: ["1px", "2px", "3px", "4px", "5px", "6px", "8px", "10px"],
      control: { type: "select" },
      description: "Width of the chip mask/border",
      table: {
        category: "Chip Configuration",
      },
    },
    chipOffset: {
      options: ["-2px", "0px", "1px", "2px", "3px", "4px", "5px", "6px"],
      control: { type: "select" },
      description: "Offset of the chip from the edge",
      table: {
        category: "Chip Configuration",
      },
    },
    chipAngle: {
      options: ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg", "315deg"],
      control: { type: "select" },
      description: "Angle of the chip position around the avatar",
      table: {
        category: "Chip Configuration",
      },
    },
    // Hide the chip prop from controls since we're using individual controls
    chip: {
      table: {
        disable: true,
      },
    },
    // Hide styleClassPassthrough from controls for cleaner UI
    styleClassPassthrough: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    src: "https://github.com/srcdev.png",
    alt: "SrcDev Avatar",
    chipSize: "12px",
    chipMaskWidth: "4px",
    chipOffset: "2px",
    chipAngle: "45deg",
    styleClassPassthrough: ["test-storybook--display-avatar", "online"],
  },
} as Meta<typeof DisplayAvatarStories>

const Template: StoryFn<typeof DisplayAvatarStories> = (args: any) => ({
  components: { DisplayAvatarStories },
  setup() {
    // Map the individual chip controls back to the chip object
    const chipConfig = {
      size: args.chipSize,
      maskWidth: args.chipMaskWidth,
      offset: args.chipOffset,
      angle: args.chipAngle,
    }

    const templateArgs = {
      ...args,
      chip: chipConfig,
    }

    return { args: templateArgs }
  },
  template: `
    <DisplayAvatarStories v-bind="args" />
  `,
})

export const Default = Template.bind({})
