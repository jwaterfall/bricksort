import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Changes the background, border and text color.',
      options: ['default', 'success', 'error', 'info', 'warning'],
    },
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

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    color: 'info',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};
