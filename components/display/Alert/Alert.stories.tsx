import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';
import Button from '../../actions/Button';

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
    children: {
      description: 'The content to be displayed at the end or footer of the alert.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    description: 'This is an alert',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    description: 'This is a success alert',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    description: 'This is an error alert',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    description: 'This is an info alert',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    description: 'This is a warning alert',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'This is a title',
    description: 'This is an alert with a title',
  },
};

export const WithButton: Story = {
  args: {
    description: 'This is an alert with a button',
    children: <Button>Click Me</Button>,
  },
};

export const WithTitleAndMultipleButtons: Story = {
  args: {
    title: 'This is a title',
    description: 'This is an alert with a title and multiple buttons',
  },
  render: (args) => {
    return (
      <Alert {...args}>
        <Button>Decline</Button>
        <Button>Accept</Button>
      </Alert>
    );
  },
};
