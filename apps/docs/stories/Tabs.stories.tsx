import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "@eligius/ui/tabs";

const meta: Meta<typeof Tabs> = {
  title: "components/surfaces/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
    },
    onValueChange: { action: "onValueChange" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    value: "tab1",
  },
  render: ({ value, onValueChange }) => (
    <Tabs value={value} onValueChange={onValueChange}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs>
  ),
};

export const Controlled: Story = {
  args: {
    value: "tab1",
  },
  render: ({ value, onValueChange }) => (
    <Tabs value={value} onValueChange={onValueChange}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  args: {
    value: "tab1",
  },
  render: ({ value, onValueChange }) => (
    <Tabs value={value} onValueChange={onValueChange}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs>
  ),
};
