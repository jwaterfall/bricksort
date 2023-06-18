'use client';

import { FC } from 'react';
import Image from 'next/image';
import { MdOutlineNotifications, MdOutlineSearch } from 'react-icons/md';

import { TopBar, TopBarSection, TopBarTitle } from '@/components/navigation/TopBar';
import { Avatar } from '@/components/display/Avatar';
import { IconButton } from '@/components/actions/IconButton';

export const CustomTopBar: FC = () => (
  <TopBar>
    <TopBarSection>
      <Image src="/logo.png" alt="Bricksort" width={40} height={40} />
      <TopBarTitle>Bricksort</TopBarTitle>
    </TopBarSection>
    <TopBarSection>
      <IconButton icon={MdOutlineSearch} variant="text" />
      <IconButton icon={MdOutlineNotifications} variant="text" />
      <Avatar src="/avatar1.jpg" size="sm" className="ml-2" />
    </TopBarSection>
  </TopBar>
);
