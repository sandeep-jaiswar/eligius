import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@eligius/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "components/feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    rounded: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "New",
    variant: "primary",
    size: "md",
    rounded: true,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3 flex-wrap">
      {(
        ["primary", "secondary", "success", "warning", "error", "info"] as const
      ).map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};

export const SharpCorners: Story = {
  args: {
    children: "Square",
    rounded: false,
  },
};
