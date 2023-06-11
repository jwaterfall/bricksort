import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { TabButtons, TabButton, TabContent } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The id of the active tab.',
      options: ['complete', 'incomplete', 'empty', 'all'],
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
  render({ value = 'complete', ...args }) {
    return (
      <Tabs value={value} {...args}>
        <TabButtons>
          <TabButton value="complete">Complete</TabButton>
          <TabButton value="incomplete">Incomplete</TabButton>
          <TabButton value="empty">Empty</TabButton>
          <TabButton value="all">All</TabButton>
        </TabButtons>
        <TabContent value="complete">Complete content</TabContent>
        <TabContent value="incomplete">Incomplete content</TabContent>
        <TabContent value="empty">Empty content</TabContent>
        <TabContent value="all">All content</TabContent>
      </Tabs>
    );
  },
};

export const WithoutTabContent: Story = {
  render({ value = 'complete', ...args }) {
    return (
      <Tabs value={value} {...args}>
        <TabButtons>
          <TabButton value="complete">Complete</TabButton>
          <TabButton value="incomplete">Incomplete</TabButton>
          <TabButton value="empty">Empty</TabButton>
          <TabButton value="all">All</TabButton>
        </TabButtons>
        The current tab is: {value}
      </Tabs>
    );
  },
};
