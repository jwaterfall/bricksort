'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { MdToys, MdSearch, MdPerson, MdHome, MdOutlineHome, MdOutlineSearch, MdOutlineToys, MdOutlinePerson } from 'react-icons/md';

import { NavigationBar, NavigationBarItem } from '@/components/navigation/NavigationBar';

interface CustomNavigationBarItemProps {
  icon: IconType;
  activeIcon?: IconType;
  href: string;
  exact?: boolean;
}

const CustomNavigationBarItem: FC<PropsWithChildren<CustomNavigationBarItemProps>> = ({ href, exact = false, children, ...props }) => {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <NavigationBarItem {...props} active={active}>
        {children}
      </NavigationBarItem>
    </Link>
  );
};

export const CustomNavigationBar: FC = () => (
  <NavigationBar className="ring-1 ring-on-surface/10 shadow-sm">
    <CustomNavigationBarItem icon={MdOutlineHome} activeIcon={MdHome} href="/" exact>
      Home
    </CustomNavigationBarItem>
    <CustomNavigationBarItem icon={MdOutlineSearch} activeIcon={MdSearch} href="/browse">
      Browse sets
    </CustomNavigationBarItem>
    <CustomNavigationBarItem icon={MdOutlineToys} activeIcon={MdToys} href="/collection">
      My collection
    </CustomNavigationBarItem>
    <CustomNavigationBarItem icon={MdOutlinePerson} activeIcon={MdPerson} href="/account">
      My account
    </CustomNavigationBarItem>
  </NavigationBar>
);
