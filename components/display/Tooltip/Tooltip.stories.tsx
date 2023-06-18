import type { Meta, StoryObj } from '@storybook/react';
import { MdHandyman } from 'react-icons/md';

import { IconButton } from '@/components/actions/IconButton';

import { Tooltip, TooltipProvider } from '.';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'The text to display inside the tooltip.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: 'Tooltip text',
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
