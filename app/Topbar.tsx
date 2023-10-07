'use client';

import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { MdOutlineLogout, MdOutlineNotifications } from 'react-icons/md';

import { useAlerts } from '@/components/AlertProvider';
import Menu, { MenuTrigger, MenuDivider, MenuItem, MenuItems } from '@/components/navigation/Menu';

interface NavbarLinkProps {
  href: string;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, children, exact = false }) => {
  const pathName = usePathname();
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className={`text-sm whitespace-nowrap transition-colors duration-75 ${active ? 'text-green-600' : 'text-zinc-500 hover:text-green-600'}`}
    >
      {children}
    </Link>
  );
};

const Topbar: FC = () => {
  const { enabled, setEnabled } = useAlerts();
  const { user } = useUser();

  return (
    <div className="h-16 bg-white border-b border-zinc-200">
      <div className="container h-full mx-auto px-4 flex items-center">
        <div className="basis-1/2">
          <Link className="flex items-center gap-2 text-2xl font-lobster" href="/">
            <Image src="/logo.png" alt="logo" width={36} height={36} className="hidden sm:block" />
            <span>Bricksort</span>
          </Link>
        </div>
        <div className="flex-1 hidden lg:flex justify-center"></div>
        <div className="basis-1/2 flex justify-end items-center gap-8">
          <nav className="flex items-center gap-6">
            <NavbarLink href="/" exact>
              Home
            </NavbarLink>
            <NavbarLink href="/browse">Browse</NavbarLink>
            <NavbarLink href="/collection">Collection</NavbarLink>
          </nav>
          <Menu>
            <MenuTrigger>
              <img
                src={user?.picture ?? undefined}
                alt="user"
                className="w-10 aspect-square rounded-full flex-shrink-0 cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </MenuTrigger>
            <MenuItems align="end">
              <MenuItem
                Icon={MdOutlineNotifications}
                enabled={enabled}
                onClick={(e: any) => {
                  e.preventDefault();
                  console.log('clicked');
                  setEnabled((enabled) => !enabled);
                }}
              >
                Alerts
              </MenuItem>
              <MenuDivider />
              <MenuItem Icon={MdOutlineLogout} href="/api/auth/logout">
                Logout
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
