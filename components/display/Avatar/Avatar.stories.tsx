import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '.';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    ring: {
      description: 'Adds a ring around the avatar.',
      options: ['primary', 'secondary'],
    },
    size: {
      description: 'Changes the size of the avatar.',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    src: {
      description: 'The image source.',
      type: 'string',
    },
    name: {
      description: 'The label to display if no image is provided.',
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
        <Avatar src="avatar1.jpg" size="xs" {...args} />
        <Avatar src="avatar2.jpg" {...args} size="sm" badgeText="3" />
        <Avatar src="avatar3.jpg" {...args} size="md" badgeText="21" />
        <Avatar src="avatar4.jpg" {...args} size="lg" badgeText="999+" />
      </div>
    );
  },
};

export const WithRing: Story = {
  ...Default,
  args: {
    ring: 'primary',
  },
};

export const WithSecondaryRing: Story = {
  ...Default,
  args: {
    ring: 'secondary',
  },
};

export const WithName: Story = {
  ...Default,
  args: {
    src: undefined,
    name: 'john doe',
  },
};

export const Placeholder: Story = {
  ...Default,
  args: {
    src: undefined,
  },
};
