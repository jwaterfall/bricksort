import type { Meta, StoryObj } from '@storybook/react';
import * as ToastPrimitive from '@radix-ui/react-toast';

import { Snackbar, SnackbarDisplay, SnackbarProvider } from '.';

const meta: Meta<typeof Snackbar> = {
    component: Snackbar,
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'The description is the main content of the snackbar.',
            type: 'string',
        },
        showCloseButton: {
            description: 'When false, the close button will not be displayed.',
        },
        actionText: {
            description: 'The text of the action button.',
            type: 'string',
        },
        actionOnClick: {
            description: 'The function to call when the action button is clicked.',
            action: 'actionOnClick',
        },
        duration: {
            description: 'The duration in milliseconds to display the snackbar.',
            type: 'number',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
    args: {
        children: 'This is a snackbar.',
        duration: 0,
    },
    render: (args) => (
        <SnackbarProvider duration={0}>
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
            <SnackbarDisplay />
        </SnackbarProvider>
    ),
};
