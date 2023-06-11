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

export const WithoutText: Story = {
  ...Basic,
  render: (args) => (
    <div className="flex gap-4">
      <Badge {...args} />
      <Badge {...args} color="info" />
      <Badge {...args} color="success" />
      <Badge {...args} color="error" />
      <Badge {...args} color="warning" />
    </div>
  ),
};
