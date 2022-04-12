import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaBox, FaCubes } from 'react-icons/fa';

import AccountDropdown from '@/components/modules/AccountDropdown';
import Box from '@/components/elements/Box';
import NavLink from '@/components/elements/NavLink';

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
          <FaBox />
        </NavItem>
      </NavLink>
      <NavLink href="/missing-parts" passHref>
        <NavItem>
          <FaCubes />
        </NavItem>
      </NavLink>
    </Nav>
    <AccountDropdown />
  </Container>
);

export default Navbar;
