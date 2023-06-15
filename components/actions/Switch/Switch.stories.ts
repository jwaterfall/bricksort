import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '.';

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Whether the switch is on or off.',
    },
    onChange: {
      description: 'Callback for when the switch is toggled.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};
