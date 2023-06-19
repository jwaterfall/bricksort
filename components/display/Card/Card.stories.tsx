import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/actions/Button';
import { Badge } from '@/components/display/Badge';

import { Card, CardBody, CardFooter, CardTitle } from '.';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {
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
        <CardBody>
          <CardTitle>This is a card title</CardTitle>
          Subtitle
        </CardBody>
      </Card>
    );
  },
};

export const WithFooter: Story = {
  render(args) {
    return (
      <Card {...args}>
        <CardBody>
          <CardTitle>Play relaxing music</CardTitle>
          From your favorite artists
        </CardBody>
        <CardFooter>
          <Button variant="tonal">Get started</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithImageAndSubtitle: Story = {
  render(args) {
    return (
      <Card {...args}>
        <img src="shoe.jpg" className="w-full aspect-video object-cover" />
        <CardBody>
          <div className="flex items-center gap-2">
            <CardTitle>Running shoes</CardTitle> <Badge>New</Badge>
          </div>
          <div className="mb-2">
            <span className="line-through">$99.99</span> $49.99
          </div>
          These shoes are the best shoes you can buy. They are made of the finest materials and will last you a lifetime.
        </CardBody>
        <CardFooter>
          <Button variant="tonal">Buy now</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const CustomWidth: Story = {
  ...WithImageAndSubtitle,
  args: {
    width: 'w-96',
  },
};
