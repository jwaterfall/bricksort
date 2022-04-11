import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaBox, FaCubes, FaHome } from 'react-icons/fa';

import NavLink from '@/components/elements/NavLink';

import { AccountButton, Container, HideOnMobile, Nav, NavItem } from './styles';

const Navbar: FC = () => (
  <Container>
    <HideOnMobile>
      <Link href="/" passHref>
        <a>
          <Image src="/images/logo.png" alt="logo" layout="responsive" width={500} height={500} />
        </a>
      </Link>
    </HideOnMobile>
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
    <HideOnMobile>
      <AccountButton>
        <Image
          src="/images/account.png"
          alt="account"
          layout="responsive"
          width={512}
          height={512}
        />
      </AccountButton>
    </HideOnMobile>
  </Container>
);

export default Navbar;
