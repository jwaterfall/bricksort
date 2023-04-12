import { FC, PropsWithChildren, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal, { ModalTitle, ModalBody, ModalFooter, ModalProps } from '.';
import Button from '../Button';

const ModalShowcase: FC<PropsWithChildren<ModalProps>> = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal {...props} isOpen={isOpen} setIsOpen={setIsOpen}>
                {children}
                <ModalFooter>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        </>
    );
};

const meta: Meta<typeof Modal> = {
    title: 'Actions/Modal',
    component: ModalShowcase,
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            description: 'Whether the modal is visible or not.',
        },
        closeOnOutsideClick: {
            description: 'Whether the modal should close when clicking outside of it.',
            control: {
                type: 'boolean',
            },
        },
        children: {
            description: 'The content to display inside the modal.',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    args: {
        isOpen: true,
        children: (
            <>
                <ModalTitle>Congratulations random Internet user!</ModalTitle>
                <ModalBody>You have been selected for a chance to get one year of subscription to use Wikipedia for free!</ModalBody>
            </>
        ),
    },
};

export const WithoutCloseOnOutsideClick: Story = {
    args: {
        isOpen: true,
        closeOnOutsideClick: false,
        children: (
            <>
                <ModalTitle>Without close on outside click</ModalTitle>
                <ModalBody>This modal will not close when clicking outside of it.</ModalBody>
            </>
        ),
    },
};
