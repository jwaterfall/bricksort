import type { Meta, StoryObj } from '@storybook/react';
import { MdOutlineDarkMode, MdOutlineLogout, MdOutlineExpandMore, MdOutlineNotifications } from 'react-icons/md';

import Menu, { MenuTrigger, MenuItems, MenuItem, MenuDivider } from '.';
import Button from '@/components/actions/Button';

const meta: Meta<typeof MenuItems> = {
  component: MenuItems,
  tags: ['autodocs'],
  argTypes: {
    compact: {
      description: 'Changes the size of the menu to be more compact.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItems>;

const MenuTemplate: Story = {
  render(args) {
    return (
      <Menu>
        <MenuTrigger>
          <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
        </MenuTrigger>
        <MenuItems {...args}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuItems>
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
    <Menu>
      <MenuTrigger>
        <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
      </MenuTrigger>
      <MenuItems {...args}>
        <MenuItem Icon={MdOutlineNotifications}>Item 1</MenuItem>
        <MenuItem Icon={MdOutlineDarkMode}>Item 2</MenuItem>
        <MenuItem Icon={MdOutlineLogout}>Item 3</MenuItem>
      </MenuItems>
    </Menu>
  ),
};

export const WithDividers: Story = {
  render: (args) => (
    <Menu>
      <MenuTrigger>
        <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
      </MenuTrigger>
      <MenuItems {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuDivider />
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
        <MenuItem>Item 6</MenuItem>
      </MenuItems>
    </Menu>
  ),
};

export const WithLinks: Story = {
  render: (args) => (
    <Menu>
      <MenuTrigger>
        <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
      </MenuTrigger>
      <MenuItems {...args}>
        <MenuItem href="#item-1">Item 1</MenuItem>
        <MenuItem href="#item-2">Item 2</MenuItem>
        <MenuItem href="#item-3">Item 3</MenuItem>
      </MenuItems>
    </Menu>
  ),
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Menu>
      <MenuTrigger>
        <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
      </MenuTrigger>
      <MenuItems {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem disabled>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuItems>
    </Menu>
  ),
};

export const WithToggleItems: Story = {
  render: (args) => (
    <Menu>
      <MenuTrigger>
        <Button EndIcon={MdOutlineExpandMore}>Menu</Button>
      </MenuTrigger>
      <MenuItems {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem type="toggle">Toggle 2</MenuItem>
        <MenuItem type="toggle">Toggle 3</MenuItem>
      </MenuItems>
    </Menu>
  ),
};
