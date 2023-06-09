import type { Meta, StoryObj } from '@storybook/react';
import { FaTrash } from 'react-icons/fa';

import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Changes the background, border and text color.',
      options: ['default', 'primary', 'info', 'success', 'error', 'warning'],
    },
    variant: {
      description: 'A default button will fill the background with the color, while a secondary button will have a transparent background.',
      options: ['default', 'secondary', 'tertiary'],
    },
    shape: {
      description: 'The default shape has a dynamic size whilst square and circle have a 1:1 aspect ratio.',
      options: ['default', 'rounded', 'square', 'circle'],
    },
    size: {
      description: 'The size of the button.',
      options: ['sm', 'md', 'lg'],
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
    Icon: {
      description: 'An icon to display to the left of the text.',
    },
    EndIcon: {
      description: 'An icon to display to the right of the text.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args}>Default</Button>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  ...Default,
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  ...Default,
  args: {
    variant: 'tertiary',
  },
};

export const Rounded: Story = {
  ...Default,
  args: {
    shape: 'rounded',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button {...args}>Default</Button>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  ...Default,
  args: {
    Icon: FaTrash,
  },
};

export const WithEndIcon: Story = {
  ...Default,
  args: {
    EndIcon: FaTrash,
  },
};

export const Square: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} shape="square" Icon={FaTrash} />
      <Button {...args} shape="square" color="primary" Icon={FaTrash} />
      <Button {...args} shape="square" color="info" Icon={FaTrash} />
      <Button {...args} shape="square" color="success" Icon={FaTrash} />
      <Button {...args} shape="square" color="error" Icon={FaTrash} />
      <Button {...args} shape="square" color="warning" Icon={FaTrash} />
    </div>
  ),
};

export const Circle: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} shape="circle" Icon={FaTrash} />
      <Button {...args} shape="circle" color="primary" Icon={FaTrash} />
      <Button {...args} shape="circle" color="info" Icon={FaTrash} />
      <Button {...args} shape="circle" color="success" Icon={FaTrash} />
      <Button {...args} shape="circle" color="error" Icon={FaTrash} />
      <Button {...args} shape="circle" color="warning" Icon={FaTrash} />
    </div>
  ),
};
