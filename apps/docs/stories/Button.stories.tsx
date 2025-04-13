import Button from '@eligius/ui/button';
import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Components/Atomic/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    iconPosition: {
      control: "radio",
      options: ["start", "end"],
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    fullWidth: false,
    icon: undefined,
    iconPosition: "start",
  },
  tags: ["autodocs"], // optional: enables automatic docs if using @storybook/addon-docs
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Button {...args} size="xs">
        Extra Small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Add Item",
    icon: <ArrowRight />,
    iconPosition: "start",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
