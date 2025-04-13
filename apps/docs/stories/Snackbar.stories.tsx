import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Snackbar from "@eligius/ui/snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "components/feedback/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    duration: { control: "number", defaultValue: 3000 },
    onClose: { action: "onClose" },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: (args) => {
    const [message, setMessage] = useState("");

    const handleShowSnackbar = () => {
      setMessage("This is a snackbar message!");
    };

    return (
      <div>
        <button
          onClick={handleShowSnackbar}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Show Snackbar
        </button>
        {message && <Snackbar {...args} message={message} />}
      </div>
    );
  },
  args: {
    duration: 3000,
  },
};

export const WithAction: Story = {
  render: (args) => {
    const [message, setMessage] = useState("");

    const handleShowSnackbar = () => {
      setMessage("This is a snackbar message with action!");
    };

    const handleActionClick = () => {
      alert("Action clicked!");
    };

    return (
      <div>
        <button
          onClick={handleShowSnackbar}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Show Snackbar
        </button>
        {message && (
          <Snackbar
            {...args}
            message={message}
            action={{ label: "Undo", onClick: handleActionClick }}
          />
        )}
      </div>
    );
  },
  args: {
    duration: 3000,
  },
};

export const WithCustomDuration: Story = {
  render: (args) => {
    const [message, setMessage] = useState("");

    const handleShowSnackbar = () => {
      setMessage("This snackbar has a custom duration!");
    };

    return (
      <div>
        <button
          onClick={handleShowSnackbar}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Show Snackbar
        </button>
        {message && <Snackbar {...args} message={message} />}
      </div>
    );
  },
  args: {
    duration: 5000,
  },
};
