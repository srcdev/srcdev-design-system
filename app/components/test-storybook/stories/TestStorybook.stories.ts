import type { Meta, StoryFn } from "@storybook/vue3"
import StoryBookComponent from "../TestStorybook.vue"

export default {
  title: "Components/TestStorybook/TestStorybook",
  component: StoryBookComponent,
  args: {
    styleClassPassthrough: ["test-storybook"],
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

export const TitleOnlyDismissable = Template.bind({})
TitleOnlyDismissable.args = {
  styleClassPassthrough: ["test-storybook--title-only-dismissable"],
  titleSlot: "Title Slot Content",
}
