import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    border: {
      description: 'Changes the border color.',
      options: ['primary', 'secondary'],
    },
    size: {
      description: 'Changes the size of the avatar.',
      options: ['sm', 'md', 'lg'],
    },
    src: {
      description: 'The image source.',
      type: 'string',
    },
    initials: {
      description: 'The initials to display if no image is provided.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render(args) {
    return (
      <div className="flex gap-4 items-center">
        <Avatar src="avatar1.jpg" size="sm" {...args} />
        <Avatar src="avatar2.jpg" {...args} size="md" />
        <Avatar src="avatar3.jpg" {...args} size="lg" />
      </div>
    );
  },
};

export const WithBorder: Story = {
  ...Default,
  args: {
    border: 'primary',
  },
};

export const WithSecondaryBorder: Story = {
  ...Default,
  args: {
    border: 'secondary',
  },
};

export const WithInitials: Story = {
  ...Default,
  args: {
    src: undefined,
    initials: 'jw',
  },
};

export const Placeholder: Story = {
  ...Default,
  args: {
    src: undefined,
  },
};
