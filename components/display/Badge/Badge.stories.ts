import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';

const meta: Meta<typeof Badge> = {
    title: 'Display/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        color: {
            description: 'Changes the background, border and text color.',
            control: {
                type: 'select',
                options: ['default', 'primary', 'success', 'error', 'info', 'warning'],
            },
        },
        size: {
            description: 'The size of the badge.',
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
        },
        variant: {
            description: 'A solid badge will fill the background with the color, while an outline badge will only have a border.',
            control: {
                type: 'select',
                options: ['solid', 'outline'],
            },
        },
        children: {
            description: 'The text to display inside the badge.',
            control: {
                type: 'text',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        color: 'default',
        children: 'Badge',
    },
};

export const Primary: Story = {
    args: {
        color: 'primary',
        children: 'Badge',
    },
};

export const Success: Story = {
    args: {
        color: 'success',
        children: 'Badge',
    },
};

export const Error: Story = {
    args: {
        color: 'error',
        children: 'Badge',
    },
};

export const Info: Story = {
    args: {
        color: 'info',
        children: 'Badge',
    },
};

export const Warning: Story = {
    args: {
        color: 'warning',
        children: 'Badge',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Badge',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Badge',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Badge',
    },
};

export const OutlinePrimary: Story = {
    args: {
        variant: 'outline',
        color: 'primary',
        children: 'Badge',
    },
};
