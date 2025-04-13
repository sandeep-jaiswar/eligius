import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "@eligius/ui/pagination";

const meta: Meta<typeof Pagination> = {
  title: "components/navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number", defaultValue: 1 },
    totalPages: { control: "number", defaultValue: 10 },
    onPageChange: { action: "page changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const CustomTotalPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 50,
  },
};

export const EdgeCase: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};
