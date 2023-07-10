import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Selection/Switch",
  tags: ["autodocs"],
  argTypes: {
    value: {
      type: "boolean",
      description: "The value of the switch",
    },
    onChange: {
      action: "onChange",
      description: "The function to call when the switch is toggled",
    },
    disabled: {
      type: "boolean",
      description: "Whether the switch is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    disabled: true,
    value: true,
  },
};
