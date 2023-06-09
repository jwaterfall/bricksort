import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/actions/Button';

import Modal, { ModalTitle, ModalBody, ModalFooter, ModalTrigger, ModalClose, ModalContent } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content to display inside the modal.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render(args) {
    return (
      <Modal {...args}>
        <ModalTrigger>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalBody>This is the modal body. It can contain any content you want, including other components.</ModalBody>
          <ModalFooter>
            <ModalClose>
              <Button>Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};
