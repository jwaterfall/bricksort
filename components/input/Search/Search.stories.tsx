import type { Meta, StoryObj } from '@storybook/react';

import { Search } from '.';

const meta: Meta<typeof Search> = {
    component: Search,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
    args: {},
};
