import type { Meta, StoryObj } from '@storybook/react';
import { FaTrash } from 'react-icons/fa';

import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Changes the background, border and text color.',
      options: ['default', 'primary'],
      control: {
        type: 'select',
      },
    },
    size: {
      description: 'The size of the button.',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      description: 'The default shape has a dynamic size whilst square and circle have a 1:1 aspect ratio.',
      options: ['default', 'square', 'circle'],
    },
    variant: {
      description: 'A solid button will fill the background with the color, while an outline button will only have a border.',
      options: ['solid', 'outline'],
    },
    isFullWidth: {
      description: 'A full width button will fill the width of its container.',
      type: 'boolean',
    },
    children: {
      description: 'The text to display inside the button.',
      type: 'string',
    },
    onClick: {
      description: 'The function to call when the button is clicked.',
      action: 'onClick',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    color: 'default',
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button',
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const OutlinePrimary: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button',
    Icon: FaTrash,
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    Icon: FaTrash,
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    Icon: FaTrash,
  },
};
