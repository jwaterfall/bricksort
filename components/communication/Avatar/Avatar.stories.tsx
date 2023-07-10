import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Communication/Avatar",
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "The size of the avatar.",
      options: ["xs", "sm", "md", "lg"],
    },
    ring: {
      description: "The color of the ring around the avatar.",
      options: ["primary", "secondary"],
    },
    src: {
      description: "The source URL of the image to display.",
      type: "string",
    },
    badgeText: {
      description: "The text to display in the badge.",
      type: "string",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render(args) {
    return (
      <div className="flex items-center gap-4">
        <Avatar src="avatar1.jpg" size="xs" {...args} />
        <Avatar src="avatar2.jpg" {...args} size="sm" badgeText="3" />
        <Avatar src="avatar3.jpg" {...args} size="md" badgeText="21" />
        <Avatar src="avatar4.jpg" {...args} size="lg" badgeText="999+" />
      </div>
    );
  },
};

export const WithRing: Story = {
  ...Default,
  args: {
    ring: "primary",
  },
};

export const WithSecondaryRing: Story = {
  ...Default,
  args: {
    ring: "secondary",
  },
};

export const WithNoImage: Story = {
  ...Default,
  args: {
    src: undefined,
  },
};
