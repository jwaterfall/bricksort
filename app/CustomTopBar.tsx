'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { MdLogin, MdLogout, MdMoreVert, MdNotifications, MdPerson, MdSearch } from 'react-icons/md';

import { TopBar, TopBarSection, TopBarTitle } from '@/components/navigation/TopBar';
import { Avatar } from '@/components/display/Avatar';
import { IconButton } from '@/components/actions/IconButton';
import { Menu, MenuItem } from '@/components/navigation/Menu';

export const CustomTopBar: FC = () => {
    const { user } = useUser();

    return (
        <TopBar>
            <TopBarSection>
                <Image src="/logo.png" alt="Bricksort" width={40} height={40} />
                <TopBarTitle>Bricksort</TopBarTitle>
            </TopBarSection>
            <TopBarSection>
                <IconButton icon={MdSearch} variant="text" />
                <IconButton icon={MdNotifications} variant="text" />
                {user && <Avatar src={user?.picture ?? undefined} size="sm" className="mx-2" />}
                <Menu align="end" trigger={<IconButton icon={MdMoreVert} variant="text" />}>
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
            </TopBarSection>
        </TopBar>
    );
};
