import type { Meta, StoryObj } from '@storybook/react';

import { MdFolder, MdHome, MdPerson, MdSearch } from 'react-icons/md';

import { NavigationBar, NavigationBarItem } from '.';

const meta: Meta<typeof NavigationBar> = {
  title: 'navigation/Navigation Bar',
  component: NavigationBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  render(args) {
    return (
      <NavigationBar>
        <NavigationBarItem active icon={MdHome}>
          Home
        </NavigationBarItem>
        <NavigationBarItem icon={MdSearch}>Browse</NavigationBarItem>
        <NavigationBarItem icon={MdFolder} badgeText="999+">
          Collection
        </NavigationBarItem>
        <NavigationBarItem icon={MdPerson}>Account</NavigationBarItem>
      </NavigationBar>
    );
  },
};

export const WithoutText: Story = {
  render(args) {
    return (
      <NavigationBar>
        <NavigationBarItem active icon={MdHome} />
        <NavigationBarItem icon={MdSearch} />
        <NavigationBarItem icon={MdFolder} />
        <NavigationBarItem icon={MdPerson} />
      </NavigationBar>
    );
  },
};
