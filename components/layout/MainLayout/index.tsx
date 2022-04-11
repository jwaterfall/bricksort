import { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/modules/Navbar';

import { Container, Content } from './styles';

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Container>
    <Navbar />
    <Content>{children}</Content>
  </Container>
);

export default MainLayout;
