'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdFolder, MdHome, MdPerson, MdSearch } from 'react-icons/md';
import { IconType } from 'react-icons';

import AppBar, { AppBarItem } from '@/components/navigation/AppBar';

interface AppBarLinkProps {
  Icon: IconType;
  href: string;
  exact?: boolean;
}

const AppBarLink: FC<PropsWithChildren<AppBarLinkProps>> = ({ href, Icon, children, exact = false }) => {
  const pathName = usePathname();
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link href={href}>
      <AppBarItem Icon={Icon} active={active}>
        {children}
      </AppBarItem>
    </Link>
  );
};

const BottomAppBar: FC = () => (
  <AppBar>
    <AppBarLink href="/" exact Icon={MdHome}>
      Home
    </AppBarLink>
    <AppBarLink href="/browse" Icon={MdSearch}>
      Browse
    </AppBarLink>
    <AppBarLink href="/collection" Icon={MdFolder}>
      Collection
    </AppBarLink>
    <AppBarLink href="/account" Icon={MdPerson}>
      Account
    </AppBarLink>
  </AppBar>
);

export default BottomAppBar;
