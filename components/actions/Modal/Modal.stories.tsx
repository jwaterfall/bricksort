import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/actions/Button';

import Modal, { ModalTitle, ModalBody, ModalFooter } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'Whether the modal is visible or not.',
      type: 'boolean',
    },
    setIsOpen: {
      description: 'A function that sets the `isOpen` state.',
      action: 'setIsOpen',
    },
    closeOnOutsideClick: {
      description: 'Whether the modal should close when clicking outside of it.',
      type: 'boolean',
    },
    children: {
      description: 'The content to display inside the modal.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate: Story = {
  render(args) {
    return (
      <Modal {...args}>
        <ModalTitle>Modal Title</ModalTitle>
        <ModalBody>This is the modal body. It can contain any content you want, including other components.</ModalBody>
        <ModalFooter>
          <Button onClick={() => args.setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  },
};

export const Default: Story = {
  ...ModalTemplate,
};

export const WithoutCloseOnOutsideClick: Story = {
  ...ModalTemplate,
  args: {
    closeOnOutsideClick: false,
  },
};
