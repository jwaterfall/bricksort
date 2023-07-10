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

export const CustomTopBar: FC = () => {
    const { user } = useUser();

    return (
        <TopAppBar>
            <TopBarSection>
                <Image src="/logo.png" alt="Bricksort" width={40} height={40} className='mr-2' />
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
        </TopAppBar>
    );
};
