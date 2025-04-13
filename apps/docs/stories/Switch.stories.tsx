import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@eligius/ui/switch";

const meta: Meta<typeof Switch> = {
  title: "components/inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: "Switch Label",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: "Checked Switch",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: "Disabled Switch",
  },
};
