import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "@eligius/ui/spinner";

const meta: Meta<typeof Spinner> = {
  title: "components/feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
};
