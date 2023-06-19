import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '@/components/display/Avatar';
import { Button } from '@/components/actions/Button';
import { Switch } from '@/components/actions/Switch';

import { List } from '.';
import { MdAddShoppingCart } from 'react-icons/md';

const meta: Meta<typeof List> = {
  component: List,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Title of the list item',
      control: { type: 'text' },
    },
    subtitle: {
      description: 'Subtitle of the list item',
      control: { type: 'text' },
    },
    body: {
      description: 'The body text of the list item',
      control: { type: 'text' },
    },
    leftElement: {
      description: 'The element to display before the text',
    },
    rightElement: {
      description: 'The element to display to the right of the list item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    title: 'Amy Farha',
    subtitle: 'You may know',
    body: 'Works at GitHub - 3 mutual friends',
    leftElement: <Avatar src="avatar1.jpg" />,
    rightElement: <Button variant="tonal">Add friend</Button>,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Bonsai',
    subtitle: 'Plants',
    leftElement: <img src="bonsai.jpg" alt="Bonsai" className="h-14 w-28 object-cover rounded-xl" />,
    rightElement: (
      <Button variant="tonal" iconLeft={MdAddShoppingCart}>
        Add to cart
      </Button>
    ),
  },
};

export const WithSwitch: Story = {
  args: {
    title: 'Dark mode',
    subtitle: 'Appearance',
    body: 'Use dark mode to make the app easier on your eyes',
    rightElement: <Switch />,
  },
};
