import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MdHandyman } from "react-icons/md";

import { IconButton } from "../../actions/IconButton";

import { Tooltip, TooltipProvider } from ".";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Containment/Tooltip",
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "The text to display in the tooltip.",
      type: "string",
    },
    side: {
      description: "The side of the trigger to display the tooltip on.",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      description: "The alignment of the tooltip relative to the trigger.",
      options: ["start", "center", "end"],
    },
    children: {
      description: "The child element(s) that the tooltip will be applied to.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: "Tooltip text",
  },
  render(args) {
    return (
      <TooltipProvider>
        <Tooltip {...args}>
          <IconButton icon={MdHandyman} />
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export const WithLongText: Story = {
  ...Default,
  args: {
    ...Default.args,
    text: "This is a very long tooltip text that should wrap to multiple lines. This is a very long tooltip text that should wrap to multiple lines. This is a very long tooltip text that should wrap to multiple lines.",
  },
};

export const RightSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "right",
  },
};

export const BottomSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "bottom",
  },
};

export const LeftSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "left",
  },
};

export const StartAlign: Story = {
  ...Default,
  args: {
    ...Default.args,
    align: "start",
  },
};

export const EndAlign: Story = {
  ...Default,
  args: {
    ...Default.args,
    align: "end",
  },
};
