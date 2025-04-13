import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "@eligius/ui/input";

const meta: Meta<typeof Input> = {
  title: "components/inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "changed" },
    type: {
      control: "select",
      options: ["text", "password", "email", "tel", "number", "url"],
    },
    error: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: "Enter text here",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="This field is required"
      />
    );
  },
  args: {
    placeholder: "Required field",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={true}
      />
    );
  },
  args: {
    placeholder: "Disabled input",
  },
};
