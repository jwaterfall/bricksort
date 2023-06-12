import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The text to display inside the badge.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};