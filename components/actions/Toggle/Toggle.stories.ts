import type { Meta, StoryObj } from '@storybook/react';

import Toggle from '.';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The size of the button.',
      options: ['sm', 'md', 'lg'],
    },
    enabled: {
      description: 'Whether the button is enabled.',
    },
    onChange: {
      description: 'Callback for when the button is toggled.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
