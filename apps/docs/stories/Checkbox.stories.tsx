import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Checkbox from "@eligius/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "components/inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(val) => setChecked(val)}
      />
    );
  },
  args: {
    label: "Accept terms and conditions",
  },
};

export const PreChecked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(val) => setChecked(val)}
      />
    );
  },
  args: {
    label: "I am already checked",
  },
};
