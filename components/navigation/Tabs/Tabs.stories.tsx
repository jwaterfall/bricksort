import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { Tab } from '.';

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        active: {
            description: 'The id of the active tab.',
        },
        onChange: {
            description: 'The function to call when a tab is clicked.',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const Template = () => {
    const [active, onChange] = useState('tab-1');

    return (
        <Tabs active={active} onChange={onChange}>
            <Tab id="tab-1">Tab 1 Content</Tab>
            <Tab id="tab-2">Tab 2 Content</Tab>
            <Tab id="tab-3">Tab 3 Content</Tab>
        </Tabs>
    );
};

export const Default: Story = {
    render: () => <Template />,
};
