import { FC, PropsWithChildren } from 'react';
import { FaTimes } from 'react-icons/fa';

import Box from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import { Container, Content, Header, StyledModal } from './styles';

export interface ModalProps {
  title?: string;
  show: boolean;
  onHide: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ title, show, onHide, children, ...props }) => {
  const ref = useOnClickOutside<HTMLDivElement>(onHide);

  return (
    <Container show={show} {...props}>
      <StyledModal>
        <Content ref={ref}>
          <Header>
            {title && (
              <Box flexBasis="0" flexGrow={1}>
                <Typography variant="h4" align="center">
                  {title}
                </Typography>
              </Box>
            )}
            <FaTimes onClick={onHide} />
          </Header>
          {children}
        </Content>
      </StyledModal>
    </Container>
  );
};

export default Modal;
