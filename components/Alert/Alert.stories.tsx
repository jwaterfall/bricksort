import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';
import Button from '../Button';

const meta: Meta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['default', 'success', 'error', 'info', 'warning'],
            },
        },
        title: {
            control: {
                type: 'text',
            },
        },
        description: {
            control: {
                type: 'text',
            },
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
