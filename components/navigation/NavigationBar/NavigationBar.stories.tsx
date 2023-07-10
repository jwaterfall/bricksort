import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MdFolder, MdHome, MdPerson, MdSearch } from "react-icons/md";

import { NavigationBar, NavigationBarItem } from ".";

const meta: Meta<typeof NavigationBar> = {
  title: "Navigation/Navigation Bar",
  component: NavigationBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  render() {
    return (
      <NavigationBar>
        <NavigationBarItem active icon={MdHome}>
          Home
        </NavigationBarItem>
        <NavigationBarItem icon={MdSearch}>Browse</NavigationBarItem>
        <NavigationBarItem icon={MdFolder} badge badgeText="999+">
          Collection
        </NavigationBarItem>
        <NavigationBarItem icon={MdPerson} badge badgeColor="success">Account</NavigationBarItem>
      </NavigationBar>
    );
  },
};

export const WithoutText: Story = {
  render() {
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
