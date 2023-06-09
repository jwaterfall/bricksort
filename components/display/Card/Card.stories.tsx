import type { Meta, StoryObj } from '@storybook/react';

import Card, { CardBody, CardImage, CardTitle } from '.';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      description: 'Whether the card should have a hover effect.',
      type: 'boolean',
    },
    href: {
      description: 'The URL to link to when the card is clicked.',
      type: 'string',
    },
    onClick: {
      description: 'The function to call when the card is clicked.',
      action: 'onClick',
    },
    children: {
      description: 'The text to display inside the card.',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render(args) {
    return (
      <Card {...args}>
        <CardTitle>Card Title</CardTitle>
        <CardBody>This is the card body. It can contain any content you want, including other components.</CardBody>
      </Card>
    );
  },
};

export const Hoverable: Story = {
  ...Default,
  args: {
    hoverable: true,
  },
};

export const Link: Story = {
  ...Default,
  args: {
    href: '/',
  },
};

export const NoTitle: Story = {
  render(args) {
    return (
      <Card>
        <CardBody>This is the card body. It can contain any content you want, including other components.</CardBody>
      </Card>
    );
  },
};

export const WithImage = {
  render: () => (
    <Card>
      <CardTitle>Card Title</CardTitle>
      <CardImage src="https://cdn.rebrickable.com/media/sets/8634-1.jpg" alt="set" />
      This is a card with an image.
    </Card>
  ),
};
