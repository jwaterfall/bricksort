import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '.';

const meta: Meta<typeof Pagination> = {
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
        page: {
            description: 'The current page number.',
            control: {
                type: 'number',
            },
        },
        onChange: {
            description: 'The callback function that is triggered when the page number is changed.',
            action: 'onChange',
        },
        pageCount: {
            description: 'The total number of pages.',
            control: {
                type: 'number',
            },
        },
        siblingCount: {
            description: 'The number of pages to show on each side of the current page.',
            control: {
                type: 'number',
            },
        },
        disabled: {
            description: 'Whether the pagination is disabled.',
            control: {
                type: 'boolean',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
    args: {
        page: 10,
        pageCount: 20,
    },
};

export const WithCustomSiblingCount: Story = {
    args: {
        ...Default.args,
        siblingCount: 2,
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};
