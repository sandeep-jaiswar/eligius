import type { Meta, StoryObj } from "@storybook/react";
import Popover from "@eligius/ui/popover";

const meta: Meta<typeof Popover> = {
  title: "components/surfaces/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "radio" },
      options: ["top", "right", "bottom", "left"],
      defaultValue: "top",
    },
    disabled: { control: "boolean", defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => {
    return (
      <Popover {...args} content={<div>This is a popover content!</div>}>
        <button className="px-4 py-2 text-white bg-blue-600 rounded">
          Hover me
        </button>
      </Popover>
    );
  },
  args: {
    position: "top",
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Popover {...args} content={<div>This popover is disabled.</div>}>
        <button className="px-4 py-2 text-white bg-gray-400 rounded cursor-not-allowed">
          Disabled
        </button>
      </Popover>
    );
  },
  args: {
    position: "top",
    disabled: true,
  },
};

export const DifferentPositions: Story = {
  render: (args) => {
    return (
      <div className="space-x-4">
        {["top", "right", "bottom", "left"].map((position) => (
          <Popover
            key={position}
            {...args}
            position={position}
            content={<div>This is a popover with {position} position!</div>}
          >
            <button className="px-4 py-2 text-white bg-blue-600 rounded">
              Hover me (position: {position})
            </button>
          </Popover>
        ))}
      </div>
    );
  },
  args: {
    disabled: false,
  },
};
