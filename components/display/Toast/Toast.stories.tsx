import type { Meta, StoryObj } from '@storybook/react';
import * as ToastPrimitive from '@radix-ui/react-toast';

import { Toast, ToastDisplay, ToastProvider } from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'This changes the color and icon of the toast.',
      options: ['default', 'success', 'error', 'info', 'warning'],
    },
    children: {
      description: 'The description is the main content of the toast.',
      type: 'string',
    },
    showCloseButton: {
      description: 'When false, the close button will not be displayed.',
    },
    showIcon: {
      description: 'When false, the icon will not be displayed.',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    children: 'This is an info toast, it is used to display information to the user that does not relate to any particular action.',
  },
  render: (args) => (
    <ToastProvider duration={0}>
      <Toast {...args} />
      <Toast {...args} showCloseButton={false} />
      <Toast {...args} showIcon={false} />
      <ToastPrimitive.Viewport className="flex flex-col gap-4" />
    </ToastProvider>
  ),
};

export const Success: Story = {
  ...Default,
  args: {
    variant: 'success',
    children: 'This is a success toast, it is used to display information to the user that relates to a successful action.',
  },
};

export const Error: Story = {
  ...Default,
  args: {
    variant: 'error',
    children: 'This is an error toast, it is used to display information to the user that relates to a failed action.',
  },
};

export const Warning: Story = {
  ...Default,
  args: {
    variant: 'warning',
    children: 'This is a warning toast, it is used to display information to the user that relates to a potentially dangerous action.',
  },
};

export const WithDisplay: Story = {
  ...Default,
  render: (args) => (
    <ToastProvider duration={0}>
      <Toast {...args} />
      <Toast {...args} variant="error" showIcon={false}>
        This is an error toast, it is used to display information to the user that relates to a failed action.
      </Toast>
      <Toast {...args} variant="success" showCloseButton={false}>
        This is a success toast, it is used to display information to the user that relates to a successful action.
      </Toast>
      <Toast {...args} variant="warning" showIcon={false} showCloseButton={false}>
        This is a warning toast, it is used to display information to the user that relates to a potentially dangerous action.
      </Toast>
      <ToastDisplay />
      <p className="text-sm">The toasts will appear in the bottom right corner of the screen.</p>
    </ToastProvider>
  ),
};
