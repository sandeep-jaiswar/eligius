import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@eligius/ui/alert";

const meta: Meta<typeof Alert> = {
  title: "components/feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "info", "warning"],
    },
    message: { control: "text" },
    actionLabel: { control: "text" },
    onAction: { action: "onAction" },
    onDismiss: { action: "onDismiss" },
    dismissible: { control: "boolean" },
  },
  args: {
    type: "info",
    message: "This is an informational alert!",
    actionLabel: "Take Action",
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const AlertTypes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Alert
        {...args}
        type="success"
        message="Success! Everything worked as expected."
      />
      <Alert {...args} type="error" message="Error! Something went wrong." />
      <Alert
        {...args}
        type="info"
        message="Info! Here is some useful information."
      />
      <Alert
        {...args}
        type="warning"
        message="Warning! Please double-check your input."
      />
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    type: "info",
    message: "You have unsaved changes.",
    actionLabel: "Save Now",
  },
};

export const NonDismissible: Story = {
  args: {
    type: "warning",
    message: "This alert cannot be dismissed.",
    dismissible: false,
  },
};
