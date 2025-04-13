import type { Meta, StoryObj } from "@storybook/react";
import Card from "@eligius/ui/card";

const meta: Meta<typeof Card> = {
  title: "components/surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["elevated", "outlined", "ghost", "flat"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    title: { control: "text" },
    description: { control: "text" },
    footer: { control: "text" },
    children: { control: "text" },
  },
  args: {
    title: "Card Title",
    description: "This is a description.",
    footer: "Footer content",
    children: "Here’s the main content of the card.",
    variant: "elevated",
    padding: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      {(["elevated", "outlined", "ghost", "flat"] as const).map((variant) => (
        <Card key={variant} {...args} variant={variant}>
          <strong className="capitalize">{variant}</strong> variant content
        </Card>
      ))}
    </div>
  ),
};

export const Padding: Story = {
  render: (args) => (
    <div className="grid grid-cols-4 gap-4">
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <Card key={padding} {...args} padding={padding}>
          Padding: {padding}
        </Card>
      ))}
    </div>
  ),
};

export const NoHeader: Story = {
  args: {
    title: undefined,
    description: undefined,
  },
};

export const NoFooter: Story = {
  args: {
    footer: undefined,
  },
};
