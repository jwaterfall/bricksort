import { FC, PropsWithChildren } from 'react';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Container, Content, Footer } from './styles';

export const ModalFooter = Footer;

export interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ show, onHide, children, ...props }) => {
  const ref = useOnClickOutside<HTMLDivElement>(onHide);

  return (
    <Container show={show} {...props}>
      <Content ref={ref}>{children}</Content>
    </Container>
  );
};

export default Modal;
