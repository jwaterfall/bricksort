import type { Meta, StoryObj } from '@storybook/react';

import Tag from '.';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Changes the background, border and text color.',
      options: ['default', 'primary', 'success', 'error', 'info', 'warning'],
    },
    children: {
      description: 'The text to display inside the badge.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Basic: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Tag {...args}>Default</Tag>
      <Tag {...args} color="primary">
        Primary
      </Tag>
      <Tag {...args} color="info">
        Info
      </Tag>
      <Tag {...args} color="success">
        Success
      </Tag>
      <Tag {...args} color="error">
        Error
      </Tag>
      <Tag {...args} color="warning">
        Warning
      </Tag>
    </div>
  ),
};
