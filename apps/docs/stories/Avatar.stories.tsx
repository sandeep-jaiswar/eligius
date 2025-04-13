import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "@eligius/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "components/data-display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
    },
    borderColor: { control: "text" },
    bgColor: { control: "text" },
    textColor: { control: "text" },
  },
  args: {
    initials: "JD",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/100?img=12",
    alt: "John Doe",
  },
};

export const WithInitials: Story = {
  args: {
    src: undefined,
    initials: "JD",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} initials="S" size="sm" />
      <Avatar {...args} initials="M" size="md" />
      <Avatar {...args} initials="L" size="lg" />
      <Avatar {...args} initials="XL" size="xl" />
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    initials: "XY",
    bgColor: "bg-indigo-500",
    textColor: "text-yellow-200",
    borderColor: "border-indigo-700",
  },
};
