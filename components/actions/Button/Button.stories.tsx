import type { Meta, StoryObj } from '@storybook/react';
import { MdEdit } from 'react-icons/md';

import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'Changes the background, border and text color.',
      options: ['primary', 'secondary', 'tertiary'],
    },
    variant: {
      description: 'A default button will fill the background with the color, while an outlined button will only have a border.',
      options: ['default', 'ghost', 'ghost-overlay'],
    },
    shape: {
      description: 'The default shape has a dynamic size whilst square and circle have a 1:1 aspect ratio.',
      options: ['default', 'square', 'circle'],
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
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="tertiary">
        Tertiary
      </Button>
    </div>
  ),
};

export const Ghost: Story = {
  ...Default,
  args: {
    variant: 'ghost',
  },
};

export const GhostOverlay: Story = {
  args: {
    variant: 'ghost-overlay',
  },
  render: (args) => <Button {...args}>Primary</Button>,
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
    <div className="flex flex-col gap-4 w-full">
      <Button {...args}>Primary</Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="tertiary">
        Teritary
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  ...Default,
  args: {
    Icon: MdEdit,
  },
};

export const WithEndIcon: Story = {
  ...Default,
  args: {
    EndIcon: MdEdit,
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
  },
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} Icon={MdEdit} />
      <Button {...args} color="secondary" Icon={MdEdit} />
      <Button {...args} color="tertiary" Icon={MdEdit} />
    </div>
  ),
};

export const Circle: Story = {
  ...Square,
  args: {
    shape: 'circle',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};
