import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { IconType } from 'react-icons';
import {
  MdOutlineBarChart,
  MdOutlineDarkMode,
  MdOutlineDirectionsCar,
  MdOutlineFolder,
  MdOutlineLogout,
  MdOutlineNotifications,
} from 'react-icons/md';

import { useAlerts } from '@/components/AlertProvider';
import Menu, { MenuTrigger, MenuDivider, MenuItem, MenuItems } from '@/components/navigation/Menu';

interface NavbarLinkProps {
  Icon: IconType;
  href: string;
  exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, Icon, children, exact = false }) => {
  const pathName = useRouter().pathname;
  const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 lg:px-4 text-sm font-medium rounded-sm whitespace-nowrap transition-colors duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-red-500' : ''}`} />
      <span className="hidden sm:block">{children}</span>
    </Link>
  );
};

const Topbar: FC = () => {
  const { enabled, setEnabled } = useAlerts();
  const { user } = useUser();

  return (
    <div className=" h-20 px-6 flex items-center bg-zinc-100 border-b border-zinc-300 dark:bg-zinc-900 dark:border-zinc-50/10">
      <div className="basis-1/2">
        <Link className="flex items-center gap-2 text-2xl font-lobster" href="/">
          <Image src="/logo.png" alt="logo" width={36} height={36} className="hidden sm:block" />
          <span>Bricksort</span>
        </Link>
      </div>
      <div className="flex-1 hidden lg:flex justify-center"></div>
      <div className="basis-1/2 flex justify-end items-center gap-8">
        <nav className="flex items-center gap-2">
          <NavbarLink href="/" exact Icon={MdOutlineBarChart}>
            Home
          </NavbarLink>
          <NavbarLink href="/browse" Icon={MdOutlineDirectionsCar}>
            Browse
          </NavbarLink>
          <NavbarLink href="/collection" Icon={MdOutlineFolder}>
            Collection
          </NavbarLink>
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
            <MenuItem Icon={MdOutlineDarkMode}>Dark mode</MenuItem>
            <MenuDivider />
            <MenuItem Icon={MdOutlineLogout} href="/api/auth/logout">
              Logout
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Topbar;
