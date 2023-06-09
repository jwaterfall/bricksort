import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { TabButtons, TabButton, TabContent } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The variant of the tabs.',
      options: ['line', 'solid'],
      control: 'select',
    },
    value: {
      description: 'The id of the active tab.',
      options: ['tab-1', 'tab-2', 'tab-3'],
      control: 'select',
    },
    onValueChange: {
      description: 'The function that is called when the active tab changes.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render({ value = 'tab-1', ...args }) {
    return (
      <Tabs value={value} {...args}>
        <TabButtons>
          <TabButton value="tab-1">Tab 1</TabButton>
          <TabButton value="tab-2">Tab 2</TabButton>
          <TabButton value="tab-3">Tab 3</TabButton>
        </TabButtons>
        <TabContent value="tab-1">Tab 1 content</TabContent>
        <TabContent value="tab-2">Tab 2 content</TabContent>
        <TabContent value="tab-3">Tab 3 content</TabContent>
      </Tabs>
    );
  },
};

export const Solid: Story = {
  ...Default,
  args: {
    variant: 'solid',
  },
};

export const WithoutTabContent: Story = {
  render({ value = 'tab-1', ...args }) {
    return (
      <Tabs value={value} {...args}>
        <TabButtons>
          <TabButton value="tab-1">Tab 1</TabButton>
          <TabButton value="tab-2">Tab 2</TabButton>
          <TabButton value="tab-3">Tab 3</TabButton>
        </TabButtons>
        The current tab is: {value}
      </Tabs>
    );
  },
};
