import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MdShoppingCart } from "react-icons/md";

import { IconButton } from ".";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Actions/Icon Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["filled", "tonal", "outlined", "elevated", "text"],
      description: "The visual style of the button. Defaults to `filled`.",
    },
    icon: {
      control: "none",
      description: "The icon to display inside the button.",
    },
    onClick: {
      action: "onClick",
      description: "A callback function to be called when the button is clicked.",
    },
    disabled: {
      type: "boolean",
      description: "Whether or not the button is disabled. Defaults to `false`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: MdShoppingCart,
  },
  render: (args) => (
    <>
      <IconButton {...args} />
      <IconButton {...args} variant="tonal" />
      <IconButton {...args} variant="outlined" />
      <IconButton {...args} variant="elevated" />
      <IconButton {...args} variant="text" />
    </>
  ),
};

export const Info: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    color: "info",
  },
};

export const Success: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    color: "success",
  },
};

export const Warning: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    color: "warning",
  },
};

export const Error: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    color: "error",
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};
