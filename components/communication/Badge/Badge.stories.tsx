import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Communication/Badge",
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["primary", "info", "success", "warning", "error"],
      description: "The color of the badge. Defaults to `primary`.",
    },
    children: {
      description: "The text to display inside the badge.",
      type: "string",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
  render: (args) => (
    <>
      <Badge {...args} />
      <Badge {...args} color="info" />
      <Badge {...args} color="success" />
      <Badge {...args} color="warning" />
      <Badge {...args} color="error" />
    </>
  ),
};

export const WithoutText: Story = {
  ...Default,
  args: {
    children: undefined,
  },
};
