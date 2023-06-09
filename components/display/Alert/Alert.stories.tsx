import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'This changes the color and icon of the alert.',
      options: ['default', 'success', 'error', 'info', 'warning'],
    },
    title: {
      description: 'When provided, the title will be displayed above the description and the text size of the description will be reduced.',
      type: 'string',
    },
    description: {
      description: 'The description is the main content of the alert.',
      type: 'string',
    },
    onClose: {
      description: 'When provided, a close button will be displayed on the right side of the alert.',
      action: 'onClose',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'This is an info alert',
    description: 'This is an info alert, it is used to display information to the user that does not relate to any particular action.',
    onClose: undefined,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'This is a success alert',
    description: 'This is a success alert, it is used to display information to the user that relates to a successful action.',
    onClose: undefined,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'This is an error alert',
    description: 'This is an error alert, it is used to display information to the user that relates to a failed action.',
    onClose: undefined,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'This is a warning alert',
    description: 'This is a warning alert, it is used to display information to the user that relates to a potentially dangerous action.',
    onClose: undefined,
  },
};

export const Closable: Story = {
  args: {
    title: 'This is an alert without a close button',
    description: 'This is an alert without a close button, the close button is not displayed.',
  },
};
