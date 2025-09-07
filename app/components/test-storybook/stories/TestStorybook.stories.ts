import type { Meta, StoryFn } from "@storybook/vue3"
import StoryBookComponent from "../TestStorybook.vue"

export default {
  title: "Components/TestStorybook/TestStorybook",
  component: StoryBookComponent,
  argTypes: {
    layoutTag: {
      options: ["div", "header", "footer", "section"],
      control: { type: "select" },
    },
    layoutVariant: {
      options: [
        "full",
        "full-start",
        "full-end",
        "popout",
        "popout-start",
        "popout-end",
        "content",
        "content-start",
        "content-end",
        "inset-content",
        "inset-content-start",
        "inset-content-end",
        "full-width",
        "full-content",
        "full-content-nopad",
        "full-content",
      ],
      control: { type: "select" },
    },
  },
  args: {
    styleClassPassthrough: ["test-storybook"],
    layoutTag: "div",
    layoutVariant: "full",
    titleSlot: "Title Slot Content",
  },
} as Meta<typeof StoryBookComponent>

const Template: StoryFn<typeof StoryBookComponent> = (args) => ({
  components: { StoryBookComponent },
  setup() {
    return { args }
  },
  template: `
    <StoryBookComponent v-bind="args">
      <template v-if="${"titleSlot" in args}" v-slot:titleSlot>${args.titleSlot}</template>
    </StoryBookComponent>
  `,
})

export const Default = Template.bind({})
// Default.args = {
//   styleClassPassthrough: ["test-storybook--title-only-dismissable"],
//   titleSlot: "Title Slot Content",
// }
