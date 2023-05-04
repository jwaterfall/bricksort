import type { Meta, StoryObj } from '@storybook/react';

import Menu, { MenuItem } from '@/components/navigation/Menu';
import Button from '@/components/actions/Button';

import Dropdown, { DropdownToggle, DropdownContent } from '.';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    hover: {
      description: 'Whether or not the menu should open on hover.',
      type: 'boolean',
    },
    align: {
      description: 'The horizontal alignment of the dropdown.',
      options: ['start', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownTemplate: Story = {
  render: (args) => {
    return (
      <Dropdown {...args}>
        <DropdownToggle>
          <Button>Open Dropdown</Button>
        </DropdownToggle>
        <DropdownContent>
          <Menu>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </Menu>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const Default: Story = {
  ...DropdownTemplate,
};

export const AlignEnd: Story = {
  ...DropdownTemplate,
  args: {
    align: 'end',
  },
};

export const Hover: Story = {
  ...DropdownTemplate,
  args: {
    hover: true,
  },
};
