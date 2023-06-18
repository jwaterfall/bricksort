'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { MdDashboard, MdToys, MdPlaylistAddCheck, MdSearch, MdPerson, MdLightMode, MdDarkMode } from 'react-icons/md';

import { NavigationDrawer, NavigationDrawerDivider, NavigationDrawerItem } from '@/components/navigation/NavigationDrawer';
import { IconButton } from '@/components/actions/IconButton';
import { Tooltip } from '@/components/display/Tooltip';
import { useTheme } from './Providers';

interface CustomNavigationDrawerItemProps {
  icon: IconType;
  href: string;
  exact?: boolean;
}

const CustomNavigationDrawerItem: FC<PropsWithChildren<CustomNavigationDrawerItemProps>> = ({ href, exact = false, children, ...props }) => {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <NavigationDrawerItem {...props} active={active}>
        {children}
      </NavigationDrawerItem>
    </Link>
  );
};

export const CustomNavigationDrawer: FC = () => {
  const { isDarkMode, toggleIsDarkMode } = useTheme();

  return (
    <NavigationDrawer className="sticky top-4 self-start">
      <CustomNavigationDrawerItem icon={MdDashboard} href="/" exact>
        Dashboard
      </CustomNavigationDrawerItem>
      <CustomNavigationDrawerItem icon={MdSearch} href="/browse">
        Browse sets
      </CustomNavigationDrawerItem>
      <NavigationDrawerDivider />
      <CustomNavigationDrawerItem icon={MdToys} href="/sets">
        My sets
      </CustomNavigationDrawerItem>
      <CustomNavigationDrawerItem icon={MdPlaylistAddCheck} href="/collections">
        My collections
      </CustomNavigationDrawerItem>
      <CustomNavigationDrawerItem icon={MdPerson} href="/account">
        My account
      </CustomNavigationDrawerItem>
      <NavigationDrawerDivider />
      <div className="px-4 flex items-center justify-between">
        {isDarkMode ? 'Dark mode' : 'Light mode'}
        <Tooltip text={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton variant="tonal" icon={isDarkMode ? MdLightMode : MdDarkMode} onClick={() => toggleIsDarkMode()} />
        </Tooltip>
      </div>
    </NavigationDrawer>
  );
};
