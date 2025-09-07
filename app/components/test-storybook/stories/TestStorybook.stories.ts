import type { Meta, StoryObj } from "@storybook/vue3"

import StoryBookComponent from "../TestStorybook.vue"

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
  title: "Components/TestStorybook/TestStorybook",
  component: StoryBookComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
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
} satisfies Meta<typeof StoryBookComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    styleClassPassthrough: ["test-storybook"],
    layoutTag: "div",
    layoutVariant: "full",
    titleSlot: "Title Slot Content",
  },
}
