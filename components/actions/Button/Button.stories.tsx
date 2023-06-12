import type { Meta, StoryObj } from '@storybook/react';
import { MdShoppingCart } from 'react-icons/md';

import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A default button will fill the background with the color, while an outlined button will only have a border.',
      options: ['filled', 'tonal', 'outlined', 'elavated', 'text'],
    },
    children: {
      description: 'The text to display inside the button.',
      type: 'string',
    },
    onClick: {
      description: 'The function to call when the button is clicked.',
      action: 'onClick',
    },
    iconLeft: {
      description: 'An icon to display to the left of the text.',
    },
    iconRight: {
      description: 'An icon to display to the right of the text.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'button',
  },
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} />
      <Button {...args} variant="tonal" />
      <Button {...args} variant="outlined" />
      <Button {...args} variant="elavated" />
      <Button {...args} variant="text" />
    </div>
  ),
};

export const WithIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    iconLeft: MdShoppingCart,
  },
};

export const WithEndIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    iconRight: MdShoppingCart,
  },
};

export const WithoutText: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: undefined,
    iconLeft: MdShoppingCart,
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};
