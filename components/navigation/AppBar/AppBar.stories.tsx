import type { Meta, StoryObj } from '@storybook/react';

import { MdFolder, MdHome, MdPerson, MdSearch } from 'react-icons/md';

import AppBar, { AppBarItem } from '.';

const meta: Meta<typeof AppBar> = {
  component: AppBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  render(args) {
    return (
      <AppBar>
        <AppBarItem active Icon={MdHome}>
          Home
        </AppBarItem>
        <AppBarItem Icon={MdSearch}>Browse</AppBarItem>
        <AppBarItem Icon={MdFolder}>Collection</AppBarItem>
        <AppBarItem Icon={MdPerson}>Account</AppBarItem>
      </AppBar>
    );
  },
};

export const WithoutText: Story = {
  render(args) {
    return (
      <AppBar>
        <AppBarItem active Icon={MdHome} />
        <AppBarItem Icon={MdSearch} />
        <AppBarItem Icon={MdFolder} />
        <AppBarItem Icon={MdPerson} />
      </AppBar>
    );
  },
};
