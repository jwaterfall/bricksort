import React, { Meta, StoryObj } from "@storybook/react";
import { MdContentCopy, MdContentCut, MdContentPaste, MdMoreVert } from "react-icons/md";

import { IconButton } from "../../actions/IconButton";

import { Menu, MenuItem, MenuDivider } from ".";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: "Selection/Menu",
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      description: "The element that will trigger the menu to open.",
    },
    side: {
      description: "The side of the trigger to display the menu on.",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      description: "The alignment of the menu relative to the trigger.",
      options: ["start", "center", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    trigger: <IconButton icon={MdMoreVert} />,
  },
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem>New tab</MenuItem>
        <MenuItem>New window</MenuItem>
        <MenuItem>Close tab</MenuItem>
      </Menu>
    );
  },
};

export const WithIcons: Story = {
  ...Default,
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem icon={MdContentCut}>Cut</MenuItem>
        <MenuItem icon={MdContentCopy}>Copy</MenuItem>
        <MenuItem icon={MdContentPaste}>Paste</MenuItem>
      </Menu>
    );
  },
};

export const WithIconsAndRightElement: Story = {
  ...Default,
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem icon={MdContentCut} rightElement="⌘X">
          Cut
        </MenuItem>
        <MenuItem icon={MdContentCopy} rightElement="⌘C">
          Copy
        </MenuItem>
        <MenuItem icon={MdContentPaste} rightElement="⌘V">
          Paste
        </MenuItem>
      </Menu>
    );
  },
};

export const WithDivider: Story = {
  ...Default,
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem>New tab</MenuItem>
        <MenuItem>New window</MenuItem>
        <MenuItem>Close tab</MenuItem>
        <MenuDivider />
        <MenuItem>Settings</MenuItem>
      </Menu>
    );
  },
};

export const LeftSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "left",
  },
};

export const TopSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "bottom",
  },
};

export const RightSide: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "right",
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
