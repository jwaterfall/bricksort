import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaBox, FaCubes, FaHome } from 'react-icons/fa';

import Box from '@/components/elements/Box';
import NavLink from '@/components/elements/NavLink';

import AccountDropdown from '../AccountDropdown';
import { Container, Nav, NavItem } from './styles';

const Navbar: FC = () => (
  <Container>
    <Box width="3rem" height="3rem">
      <Link href="/" passHref>
        <a>
          <Image src="/images/logo.png" alt="logo" layout="responsive" width={500} height={500} />
        </a>
      </Link>
    </Box>
    <Nav>
      <NavLink href="/" passHref>
        <NavItem>
          <FaHome />
        </NavItem>
      </NavLink>
      <NavLink href="/parts" passHref>
        <NavItem>
          <FaCubes />
        </NavItem>
      </NavLink>
      <NavLink href="/sets" passHref>
        <NavItem>
          <FaBox />
        </NavItem>
      </NavLink>
    </Nav>
    <AccountDropdown />
  </Container>
);

export default Navbar;
