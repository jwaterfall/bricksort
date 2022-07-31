import { FC, PropsWithChildren } from 'react';

import Typography from '@/components/elements/Typography';
import Navbar from '@/components/modules/Navbar';

import { Container, Content, Header } from './styles';

interface Props {
  title?: string;
}

const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => (
  <Container>
    <Navbar />
    <Content>
      {title && (
        <Header>
          <Typography variant="h2" transform="capitalize">
            {title}
          </Typography>
        </Header>
      )}
      {children}
    </Content>
  </Container>
);

export default MainLayout;
