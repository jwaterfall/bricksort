import type { Meta, StoryObj } from '@storybook/react';
import { MdAccountBalance, MdAccountBalanceWallet, MdAccountCircle, MdBarChart, MdHome, MdSettings, MdSwapHorizontalCircle } from 'react-icons/md';

import Drawer, { DrawerItem } from '.';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render(args) {
    return (
      <Drawer {...args}>
        <DrawerItem Icon={MdHome}>Home</DrawerItem>
        <DrawerItem Icon={MdBarChart}>Charts</DrawerItem>
        <DrawerItem Icon={MdSwapHorizontalCircle}>Transactions</DrawerItem>
        <DrawerItem Icon={MdAccountBalance}>Markets</DrawerItem>
        <DrawerItem Icon={MdAccountBalanceWallet}>Wallets</DrawerItem>
        <DrawerItem Icon={MdAccountCircle}>Accounts</DrawerItem>
        <DrawerItem Icon={MdSettings}>Settings</DrawerItem>
      </Drawer>
    );
  },
};
