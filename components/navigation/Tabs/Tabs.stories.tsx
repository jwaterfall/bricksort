import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardBody, CardTitle } from '@/components/display/Card';

import { Tabs, TabButtons, TabButton, TabContent } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The id of the active tab, only use this if you want to control the active tab.',
    },
    onValueChange: {
      description: 'The function that is called when the active tab changes.',
      action: 'onChange',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render({ ...args }) {
    return (
      <Tabs {...args} value={undefined} defaultValue="tab-1" className="w-full">
        <TabButtons>
          <TabButton value="tab-1">Tab 1</TabButton>
          <TabButton value="tab-2">Tab 2</TabButton>
          <TabButton value="tab-3">Tab 3</TabButton>
        </TabButtons>
        <TabContent value="tab-1">
          <div className="mt-4">
            <Card>
              <CardBody>This is the content of tab 1.</CardBody>
            </Card>
          </div>
        </TabContent>
        <TabContent value="tab-2">
          <div className="mt-4">
            <Card>
              <CardBody>This is the content of tab 2.</CardBody>
            </Card>
          </div>
        </TabContent>
        <TabContent value="tab-3">
          <div className="mt-4">
            <Card>
              <CardBody>This is the content of tab 3.</CardBody>
            </Card>
          </div>
        </TabContent>
      </Tabs>
    );
  },
};

export const Controlled: Story = {
  render({ value = 'complete', ...args }) {
    return (
      <Tabs value={value} {...args} className="w-full">
        <TabButtons>
          <TabButton value="tab-1">Tab 1</TabButton>
          <TabButton value="tab-2">Tab 2</TabButton>
          <TabButton value="tab-3">Tab 3</TabButton>
        </TabButtons>
      </Tabs>
    );
  },
};
