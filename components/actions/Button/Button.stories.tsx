import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MdShoppingCart } from "react-icons/md";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Actions/Button",
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["primary", "info", "success", "warning", "error"],
      description: "The color of the button. Defaults to `primary`.",
    },
    variant: {
      options: ["filled", "tonal", "outlined", "elevated", "text"],
      description: "The visual style of the button. Defaults to `filled`.",
    },
    iconLeft: {
      control: "none",
      description: "An optional icon to display on the left side of the button.",
    },
    iconRight: {
      control: "none",
      description: "An optional icon to display on the right side of the button.",
    },
    children: {
      type: "string",
      description: "The text to display inside the button.",
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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <>
      <Button {...args} />
      <Button {...args} variant="tonal" />
      <Button {...args} variant="outlined" />
      <Button {...args} variant="elevated" />
      <Button {...args} variant="text" />
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

export const WithIcon: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    iconLeft: MdShoppingCart,
  },
};

export const WithEndIcon: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    iconRight: MdShoppingCart,
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};
