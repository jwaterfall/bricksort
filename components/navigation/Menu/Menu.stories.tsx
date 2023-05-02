import { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FaBell, FaPaintBrush, FaSignOutAlt } from 'react-icons/fa';

import Menu, { MenuDivider, MenuItem, MenuProps } from '.';

const meta: Meta<typeof Menu> = {
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    compact: {
      description: 'Changes the size of the menu to be more compact.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const Template: FC<MenuProps> = (props) => (
  <Menu {...props}>
    <MenuItem>Item 1 Content</MenuItem>
    <MenuItem>Item 2 Content</MenuItem>
    <MenuItem>Item 3 Content</MenuItem>
  </Menu>
);

export const Default: Story = {
  render: () => <Template />,
};

export const Compact: Story = {
  render: () => <Template compact />,
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuItem Icon={FaBell}>Item 1 Content</MenuItem>
      <MenuItem Icon={FaPaintBrush}>Item 2 Content</MenuItem>
      <MenuItem Icon={FaSignOutAlt}>Item 3 Content</MenuItem>
    </Menu>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Menu>
      <MenuItem>Item 1 Content</MenuItem>
      <MenuItem>Item 2 Content</MenuItem>
      <MenuItem>Item 3 Content</MenuItem>
      <MenuDivider />
      <MenuItem>Item 4 Content</MenuItem>
      <MenuItem>Item 5 Content</MenuItem>
      <MenuItem>Item 6 Content</MenuItem>
    </Menu>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Menu>
      <a href="#item-1">
        <MenuItem>Item 1 Content</MenuItem>
      </a>
      <a href="#item-2">
        <MenuItem>Item 2 Content</MenuItem>
      </a>
      <a href="#item-3">
        <MenuItem>Item 3 Content</MenuItem>
      </a>
    </Menu>
  ),
};
