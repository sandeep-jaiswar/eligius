import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "@eligius/ui/iconbutton";
import { X, Search, Trash2 } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Components/Atomic/IconButton",
  component: IconButton,
  argTypes: {
    icon: {
      control: false,
      description: "ReactNode (e.g. Lucide icon)",
    },
    ariaLabel: {
      control: "text",
    },
    color: {
      control: "text",
      description: "Tailwind text color class (e.g. 'text-red-500')",
    },
    size: {
      control: "text",
      description: "Tailwind size classes (e.g. 'w-8 h-8')",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    ariaLabel: "Icon button",
    color: "text-gray-500",
    size: "w-10 h-10",
    disabled: false,
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <X size={18} />,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} icon={<X size={12} />} size="w-6 h-6" ariaLabel="close small" />
      <IconButton {...args} icon={<X size={16} />} size="w-8 h-8" ariaLabel="close medium" />
      <IconButton {...args} icon={<X size={20} />} size="w-10 h-10" ariaLabel="close large" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} icon={<Search />} color="text-blue-500" ariaLabel="search" />
      <IconButton {...args} icon={<Trash2 />} color="text-red-500" ariaLabel="delete" />
      <IconButton {...args} icon={<X />} color="text-green-500" ariaLabel="close" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <X />,
    disabled: true,
  },
};
