import type { Meta, StoryObj } from '@storybook/react';
import { MdAccountBalance, MdAccountBalanceWallet, MdAccountCircle, MdBarChart, MdHome, MdSettings, MdSwapHoriz } from 'react-icons/md';

import { NavigationDrawer, NavigationDrawerItem, NavigationDrawerDivider } from '.';

const meta: Meta<typeof NavigationDrawer> = {
  title: 'navigation/Navigation Drawer',
  component: NavigationDrawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationDrawer>;

export const Default: Story = {
  render(args) {
    return (
      <NavigationDrawer {...args}>
        <NavigationDrawerItem icon={MdHome} active>
          Home
        </NavigationDrawerItem>
        <NavigationDrawerItem icon={MdBarChart}>Charts</NavigationDrawerItem>
        <NavigationDrawerItem icon={MdSwapHoriz}>Transactions</NavigationDrawerItem>
        <NavigationDrawerItem icon={MdAccountBalance}>Markets</NavigationDrawerItem>
        <NavigationDrawerDivider />
        <NavigationDrawerItem icon={MdAccountBalanceWallet}>Wallet</NavigationDrawerItem>
        <NavigationDrawerItem icon={MdAccountCircle}>Account</NavigationDrawerItem>
        <NavigationDrawerItem icon={MdSettings}>Settings</NavigationDrawerItem>
      </NavigationDrawer>
    );
  },
};
