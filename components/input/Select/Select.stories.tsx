import type { Meta, StoryObj } from '@storybook/react';

import Select, { SelectOption } from '.';

const meta: Meta<typeof Select> = {
  component: Select,
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
type Story = StoryObj<typeof Select>;

const SelectTemplate: Story = {
  render({ active, ...args }) {
    return (
      <Select active={active ?? 'tab-1'} {...args}>
        <SelectOption value="tab-1">Tab 1 Content</SelectOption>
        <SelectOption value="tab-2">Tab 2 Content</SelectOption>
        <SelectOption value="tab-3">Tab 3 Content</SelectOption>
      </Select>
    );
  },
};

export const Default: Story = {
  ...SelectTemplate,
};

export const Compact: Story = {
  ...SelectTemplate,
  args: {
    compact: true,
  },
};
