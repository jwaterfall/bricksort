import type { Meta, StoryObj } from '@storybook/react';
import { FaTrash } from 'react-icons/fa';

import Button from '.';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: ['default', 'primary'],
            },
        },
        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
        },
        shape: {
            control: {
                type: 'select',
                options: ['default', 'square', 'circle'],
            },
        },
        variant: {
            control: {
                type: 'select',
                options: ['solid', 'outline'],
            },
        },
        isFullWidth: {
            control: {
                type: 'boolean',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        color: 'primary',
        children: 'Button',
    },
};

export const Default: Story = {
    args: {
        color: 'default',
        children: 'Button',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Button',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Button',
    },
};

export const FullWidth: Story = {
    args: {
        isFullWidth: true,
        children: 'Button',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Button',
    },
};

export const OutlinePrimary: Story = {
    args: {
        variant: 'outline',
        color: 'primary',
        children: 'Button',
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Button',
        Icon: FaTrash,
    },
};

export const Square: Story = {
    args: {
        shape: 'square',
        Icon: FaTrash,
    },
};

export const Circle: Story = {
    args: {
        shape: 'circle',
        Icon: FaTrash,
    },
};
