'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { MdLogin, MdLogout, MdMoreVert, MdNotifications, MdPerson, MdSearch } from 'react-icons/md';

import { TopAppBar, TopBarSection, TopBarTitle } from '@/components/navigation/TopAppBar';
import { Avatar } from '@/components/communication/Avatar';
import { Menu, MenuItem } from '@/components/selection/Menu';
import { IconButton } from '@/components/actions/IconButton';

export const CustomTopAppBar: FC = () => {
  const { user } = useUser();

  return (
    <TopAppBar className="ring-1 ring-on-surface/10 shadow-sm">
      <TopBarSection>
        <Image src="/logo.png" alt="Bricksort" width={40} height={40} className="mr-2" />
        <TopBarTitle>Bricksort</TopBarTitle>
      </TopBarSection>
      <TopBarSection>
        <IconButton icon={MdSearch} variant="text" />
        <IconButton icon={MdNotifications} variant="text" />
        {user && (
          <Menu
            align="end"
            trigger={
              <button>
                <Avatar src={user?.picture ?? undefined} size="sm" className="mx-2" />
              </button>
            }
          >
            {user ? (
              <a href="/api/auth/logout">
                <MenuItem icon={MdLogout}>Logout</MenuItem>
              </a>
            ) : (
              <a href="/api/auth/login">
                <MenuItem icon={MdLogin}>Login</MenuItem>
              </a>
            )}
            <Link href="/account">
              <MenuItem icon={MdPerson}>My account</MenuItem>
            </Link>
          </Menu>
        )}
      </TopBarSection>
    </TopAppBar>
  );
};
