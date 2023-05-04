import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { Tab } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    active: {
      description: 'The id of the active tab.',
      options: ['tab-1', 'tab-2', 'tab-3'],
      control: {
        type: 'select',
      },
    },
    onChange: {
      description: 'The function to call when a tab is clicked.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const TabsTemplate: Story = {
  render({ active, ...args }) {
    return (
      <Tabs active={active ?? 'tab-1'} {...args}>
        <Tab value="tab-1">Tab 1 Content</Tab>
        <Tab value="tab-2">Tab 2 Content</Tab>
        <Tab value="tab-3">Tab 3 Content</Tab>
      </Tabs>
    );
  },
};

export const Default: Story = {
  ...TabsTemplate,
};
