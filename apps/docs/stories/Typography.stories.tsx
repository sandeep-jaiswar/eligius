import type { Meta, StoryObj } from "@storybook/react";
import Typography from "@eligius/ui/typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Atomic/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "section",
        "aside",
        "footer",
        "header",
        "article",
        "nav",
        "main",
      ],
    },
    color: {
      control: "text",
      description: "Tailwind text color class (e.g., 'text-gray-800')",
    },
    fontWeight: {
      control: "select",
      options: ["font-light", "font-normal", "font-semibold", "font-bold"],
    },
    fontSize: {
      control: "select",
      options: [
        "text-xs",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
      ],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "p",
    color: "text-gray-800",
    fontWeight: "font-normal",
    fontSize: "text-base",
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Playground: Story = {};

export const Headings: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Typography {...args} variant="h1" fontSize="text-2xl">
        Heading 1
      </Typography>
      <Typography {...args} variant="h2" fontSize="text-xl">
        Heading 2
      </Typography>
      <Typography {...args} variant="h3" fontSize="text-lg">
        Heading 3
      </Typography>
      <Typography {...args} variant="h4" fontSize="text-base">
        Heading 4
      </Typography>
      <Typography {...args} variant="h5" fontSize="text-sm">
        Heading 5
      </Typography>
      <Typography {...args} variant="h6" fontSize="text-xs">
        Heading 6
      </Typography>
    </div>
  ),
};

export const TextWeights: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Typography {...args} fontWeight="font-light">
        Light weight
      </Typography>
      <Typography {...args} fontWeight="font-normal">
        Normal weight
      </Typography>
      <Typography {...args} fontWeight="font-semibold">
        Semibold weight
      </Typography>
      <Typography {...args} fontWeight="font-bold">
        Bold weight
      </Typography>
    </div>
  ),
};

export const CustomColors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Typography {...args} color="text-blue-600">
        Blue Text
      </Typography>
      <Typography {...args} color="text-red-500">
        Red Text
      </Typography>
      <Typography {...args} color="text-green-600">
        Green Text
      </Typography>
      <Typography {...args} color="text-purple-500">
        Purple Text
      </Typography>
    </div>
  ),
};
