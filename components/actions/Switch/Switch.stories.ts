import type { Meta, StoryObj } from '@storybook/react';

import Toggle from '.';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Whether the button is enabled.',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback for when the button is toggled.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {};
