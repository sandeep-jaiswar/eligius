import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "@eligius/ui/select";

const meta: Meta<typeof Select> = {
  title: "components/inputs/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text", defaultValue: "" },
    disabled: { control: "boolean", defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedValue(e.target.value);

    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

    return (
      <Select
        {...args}
        value={selectedValue}
        onChange={handleChange}
        options={options}
      />
    );
  },
  args: {
    placeholder: "Select an option",
    disabled: false,
    error: false,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedValue(e.target.value);

    return (
      <Select
        {...args}
        value={selectedValue}
        onChange={handleChange}
        options={OPTIONS}
      />
    );
  },
  args: {
    placeholder: "Select an option",
    disabled: false,
    error: "This field is required",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedValue(e.target.value);

    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

    return (
      <Select
        {...args}
        value={selectedValue}
        onChange={handleChange}
        options={options}
        disabled
      />
    );
  },
  args: {
    placeholder: "Select an option",
    disabled: true,
    error: false,
  },
};
