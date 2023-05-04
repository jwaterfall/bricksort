import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { IconType } from 'react-icons';
import { FaBoxOpen, FaCar, FaHome, FaBell, FaSignOutAlt, FaBellSlash } from 'react-icons/fa';

import { useAlerts } from '@/components/AlertProvider';
import Dropdown, { DropdownContent, DropdownToggle } from '@/components/actions/Dropdown';
import Menu, { MenuDivider, MenuItem } from '@/components/navigation/Menu';

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
      className="flex items-center gap-2 p-3 lg:px-4 text-sm font-medium rounded-lg whitespace-nowrap hover:bg-slate-200 transition-colors duration-75"
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
    <div className=" h-20 px-6 flex items-center bg-slate-100 border-b border-slate-300">
      <div className="basis-1/2">
        <Link className="flex items-center gap-2 text-2xl font-lobster" href="/">
          <Image src="/logo.png" alt="logo" width={36} height={36} className="hidden sm:block" />
          <span>Bricksort</span>
        </Link>
      </div>
      <div className="flex-1 hidden lg:flex justify-center"></div>
      <div className="basis-1/2 flex justify-end items-center gap-8">
        <nav className="flex items-center gap-2">
          <NavbarLink href="/" exact Icon={FaHome}>
            Home
          </NavbarLink>
          <NavbarLink href="/browse" Icon={FaCar}>
            Browse
          </NavbarLink>
          <NavbarLink href="/collection" Icon={FaBoxOpen}>
            Collection
          </NavbarLink>
        </nav>
        <Dropdown align="end" hover>
          <DropdownToggle>
            <img
              src={user?.picture ?? undefined}
              alt="user"
              className="w-10 aspect-square rounded-full flex-shrink-0 cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownToggle>
          <DropdownContent>
            <Menu>
              <MenuItem Icon={enabled ? FaBell : FaBellSlash} onClick={() => setEnabled((enabled) => !enabled)}>
                {enabled ? 'Disable Alerts' : 'Enable Alerts'}
              </MenuItem>
              <MenuDivider />
              {/* eslint-disable-next-line */}
              <a href="/api/auth/logout">
                <MenuItem Icon={FaSignOutAlt}>Logout</MenuItem>
              </a>
            </Menu>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
