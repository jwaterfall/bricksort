import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { Snackbar, SnackbarProvider } from ".";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  title: "Communication/Snackbar",
  tags: ["autodocs"],
  argTypes: {
    showCloseButton: {
      description: "Whether or not to show the close button.",
    },
    duration: {
      description: "The duration in milliseconds to show the snackbar.",
      type: "number",
    },
    actionText: {
      description: "The text of the action button.",
      type: "string",
    },
    actionOnClick: {
      description: "The function to call when the action button is clicked.",
      action: "actionOnClick",
    },
    children: {
      description: "The message to display in the snackbar.",
      type: "string",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    children: "This is a snackbar.",
    duration: 999999,
  },
  render: (args) => (
    <div className="grid w-full">
      <SnackbarProvider>
        <Snackbar {...args} />
        <Snackbar {...args} showCloseButton={false}>
          This is a snackbar without a close button.
        </Snackbar>
        <Snackbar {...args} actionText="Action">
          This is a snackbar with an action button.
        </Snackbar>
        <Snackbar {...args} showCloseButton={false} actionText="Retry">
          Can't send photo. Retry in 5 seconds.
        </Snackbar>
        <ToastPrimitive.Viewport className="flex flex-col items-center gap-4" />
      </SnackbarProvider>
    </div>
  ),
};
