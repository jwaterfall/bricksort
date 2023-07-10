import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MdAddShoppingCart } from "react-icons/md";

import { Avatar } from "../../communication/Avatar";
import { Button } from "../../actions/Button";
import { Switch } from "../../selection/Switch";

import { List } from ".";

const meta: Meta<typeof List> = {
  component: List,
  title: "Containment/List",
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "The title of the list item",
    },
    body: {
      description: "The body of the list item",
    },
    leftElement: {
      description: "An optional element to render on the left side of the list item",
      control: "none",
    },
    rightElement: {
      description: "An optional element to render on the right side of the list item",
      control: "none",
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    title: "Amy Farha",
    body: "You may know",
    leftElement: <Avatar src="avatar1.jpg" />,
    rightElement: <Button variant="tonal">Add friend</Button>,
  },
};

export const WithImage: Story = {
  args: {
    title: "Bonsai",
    body: "Plants",
    leftElement: <img src="bonsai.jpg" alt="Bonsai" className="h-14 w-28 rounded-xl object-cover" />,
    rightElement: (
      <Button variant="tonal" iconLeft={MdAddShoppingCart}>
        Add to cart
      </Button>
    ),
  },
};

export const WithSwitch: Story = {
  args: {
    title: "Dark mode",
    body: "Use dark mode to make the app easier on your eyes",
    rightElement: <Switch />,
  },
};
