import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "@eligius/ui/textarea";
import { useState } from "react";

const meta: Meta<typeof TextArea> = {
  title: "components/inputs/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "onChange" },
    placeholder: { control: "text" },
    rows: { control: "number" },
    cols: { control: "number" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    value: "This is a default text area.",
    placeholder: "Type something...",
  },
  render: (args) => <TextArea {...args} />,
};

export const Disabled: Story = {
  args: {
    value: "This text area is disabled.",
    disabled: true,
  },
  render: (args) => <TextArea {...args} />,
};

export const Controlled: Story = {
  args: {
    value: "This is a controlled text area.",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
};

export const LargeTextArea: Story = {
  args: {
    value: "This is a larger text area.",
    rows: 10,
    cols: 80,
  },
  render: (args) => <TextArea {...args} />,
};
