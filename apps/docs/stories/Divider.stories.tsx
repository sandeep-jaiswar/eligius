import type { Meta, StoryObj } from "@storybook/react";
import Divider from "@eligius/ui/divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Atomic/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    thickness: {
      control: "text",
      description: "Tailwind thickness class (e.g., 'h-1', 'w-2')",
    },
    color: {
      control: "text",
      description: "Tailwind color class suffix (e.g., 'gray-300', 'primary')",
    },
    children: {
      control: "text",
    },
  },
  args: {
    orientation: "horizontal",
    align: "center",
    children: "or",
    thickness: undefined,
    color: undefined,
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    align: "center",
    children: "Continue",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    align: "center",
    children: "OR",
    className: "h-40", // height needed for visual space
  },
};

export const NoContent: Story = {
  args: {
    children: undefined,
  },
};

export const StartAlign: Story = {
  args: {
    align: "start",
    children: "Start",
  },
};

export const EndAlign: Story = {
  args: {
    align: "end",
    children: "End",
  },
};

export const CustomColorAndThickness: Story = {
  args: {
    children: "Custom",
    color: "blue-500",
    thickness: "h-1",
  },
};
