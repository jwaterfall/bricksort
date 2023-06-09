import { FC, PropsWithChildren } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import Card, { CardBody, CardFooter, CardTitle } from '@/components/display/Card';

export const ModalTitle: FC<PropsWithChildren> = ({ children }) => (
  <Dialog.Title asChild>
    <CardTitle>{children}</CardTitle>
  </Dialog.Title>
);
export const ModalBody: FC<PropsWithChildren> = ({ children }) => (
  <Dialog.Description asChild>
    <CardBody>{children}</CardBody>
  </Dialog.Description>
);

export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;
export const ModalFooter = CardFooter;

export const ModalContent: FC<PropsWithChildren> = ({ children }) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed bg-black/50" />
    <Dialog.Content className="fixed left-0 top-0 flex items-center justify-center w-full h-full">
      <Card>{children}</Card>
    </Dialog.Content>
  </Dialog.Portal>
);

const Modal = Dialog.Root;

export default Modal;
