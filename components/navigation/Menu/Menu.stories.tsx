import type { Meta, StoryObj } from '@storybook/react';
import { FaBell, FaPaintBrush, FaSignOutAlt } from 'react-icons/fa';

import Menu, { MenuDivider, MenuItem } from '.';

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

const MenuTemplate: Story = {
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );
  },
};

export const Default: Story = {
  ...MenuTemplate,
};

export const Compact: Story = {
  ...MenuTemplate,
  args: {
    compact: true,
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem Icon={FaBell}>Item 1</MenuItem>
      <MenuItem Icon={FaPaintBrush}>Item 2</MenuItem>
      <MenuItem Icon={FaSignOutAlt}>Item 3</MenuItem>
    </Menu>
  ),
};

export const WithDividers: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuDivider />
      <MenuItem>Item 4</MenuItem>
      <MenuItem>Item 5</MenuItem>
      <MenuItem>Item 6</MenuItem>
    </Menu>
  ),
};

export const WithLinks: Story = {
  render: (args) => (
    <Menu {...args}>
      <a href="#item-1">
        <MenuItem>Item 1</MenuItem>
      </a>
      <a href="#item-2">
        <MenuItem>Item 2</MenuItem>
      </a>
      <a href="#item-3">
        <MenuItem>Item 3</MenuItem>
      </a>
    </Menu>
  ),
};

export const WithActiveItem: Story = {
  render: () => (
    <Menu>
      <MenuItem active>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </Menu>
  ),
};
