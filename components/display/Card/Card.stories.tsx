import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/actions/Button';
import Badge from '@/components/display/Badge';

import Card, { CardBody, CardFooter, CardTitle } from '.';

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
          <CardTitle>Welcome to our website!</CardTitle>
          We are excited to have you here. Our website offers a wide range of products and services to meet your needs. Feel free to browse our
          selection and let us know if you have any questions.
          <CardFooter>
            <Button>Learn More</Button>
          </CardFooter>
        </CardBody>
      </Card>
    );
  },
};

export const WithImage: Story = {
  render(args) {
    return (
      <Card {...args}>
        <img src="shoe.jpg" className="w-full aspect-video object-cover" />
        <CardBody>
          <CardTitle>
            Lime green shoes <Badge>New</Badge>
          </CardTitle>
          <span className="line-through">$99.99</span> $49.99
          <CardFooter>
            <Button>Buy now</Button>
          </CardFooter>
        </CardBody>
      </Card>
    );
  },
};
