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
    variant: {
      description: 'The variant of the badge.',
      options: ['solid', 'outline'],
    },
    shape: {
      description: 'The shape of the badge.',
      options: ['default', 'rounded'],
    },
    size: {
      description: 'The size of the badge.',
      options: ['sm', 'md', 'lg'],
    },
    children: {
      description: 'The text to display inside the badge.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Badge {...args}>Default</Badge>
      <Badge {...args} color="info">
        Info
      </Badge>
      <Badge {...args} color="success">
        Success
      </Badge>
      <Badge {...args} color="error">
        Error
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
    </div>
  ),
};

export const Outline: Story = {
  ...Basic,
  args: {
    variant: 'outline',
  },
};

export const Rounded: Story = {
  ...Basic,
  args: {
    shape: 'rounded',
  },
};

export const Small: Story = {
  ...Basic,
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  ...Basic,
  args: {
    size: 'lg',
  },
};
