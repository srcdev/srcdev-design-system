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
      control: { type: "range", min: 1, max: 24, step: 1 },
      description: "Size of the chip in pixels",
      table: {
        category: "Chip Configuration",
      },
    },
    chipMaskWidth: {
      control: { type: "range", min: 0, max: 12, step: 1 },
      description: "Width of the chip mask/border in pixels",
      table: {
        category: "Chip Configuration",
      },
    },
    chipOffset: {
      control: { type: "range", min: -12, max: 12, step: 1 },
      description: "Offset of the chip from the edge in pixels",
      table: {
        category: "Chip Configuration",
      },
    },
    chipAngle: {
      control: { type: "range", min: 0, max: 360, step: 45 },
      description: "Angle of the chip position around the avatar in degrees",
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
    chipSize: 12,
    chipMaskWidth: 4,
    chipOffset: 2,
    chipAngle: 45,
    styleClassPassthrough: ["test-storybook--display-avatar", "online"],
  },
} as Meta<typeof DisplayAvatarStories>

const Template: StoryFn<typeof DisplayAvatarStories> = (args: any) => ({
  components: { DisplayAvatarStories },
  setup() {
    // Map the individual chip controls back to the chip object with proper units
    const chipConfig = {
      size: `${args.chipSize}px`,
      maskWidth: `${args.chipMaskWidth}px`,
      offset: `${args.chipOffset}px`,
      angle: `${args.chipAngle}deg`,
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
