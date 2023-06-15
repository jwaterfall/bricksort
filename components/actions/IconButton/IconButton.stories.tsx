import type { Meta, StoryObj } from '@storybook/react';
import { MdShoppingCart } from 'react-icons/md';

import { IconButton } from '.';

const meta: Meta<typeof IconButton> = {
  title: 'actions/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A default iconbutton will fill the background with the color, while an outlined iconbutton will only have a border.',
      options: ['filled', 'tonal', 'outlined', 'elavated', 'text'],
    },
    onClick: {
      description: 'The function to call when the iconbutton is clicked.',
      action: 'onClick',
    },
    icon: {
      description: 'An icon to display inside the button.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: MdShoppingCart,
  },
  render: (args) => (
    <div className="flex gap-4">
      <IconButton {...args} />
      <IconButton {...args} variant="tonal" />
      <IconButton {...args} variant="outlined" />
      <IconButton {...args} variant="elavated" />
      <IconButton {...args} variant="text" />
    </div>
  ),
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

