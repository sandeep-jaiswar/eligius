import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Modal from "@eligius/ui/modal";

const meta: Meta<typeof Modal> = {
  title: "components/surfaces/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    onAction: { action: "action clicked" },
    title: { control: "text" },
    size: { control: "select", options: ["small", "medium", "large"] },
    actionLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "Modal Title",
    size: "medium",
    actionLabel: "Confirm",
  },
};

export const LargeModal: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Large Modal
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "Large Modal",
    size: "large",
    actionLabel: "Proceed",
  },
};

export const ModalWithAction: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Modal with Action
        </button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "Modal with Action",
    size: "medium",
    actionLabel: "Confirm Action",
  },
};
