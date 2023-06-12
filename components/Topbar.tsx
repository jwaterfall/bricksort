'use client';

import { FC } from 'react';
import { MdMenu } from 'react-icons/md';

import NavigationBar, { NavigationBarSection } from '@/components/navigation/TopBar';
import Tabs, { TabButton, TabButtons } from '@/components/navigation/Tabs';
import Avatar from '@/components/display/Avatar';
import Button from '@/components/actions/Button';

const Topbar: FC = () => (
  <NavigationBar>
    <NavigationBarSection>
      <Button shape="square" variant="ghost" color="secondary" Icon={MdMenu} />
      <Tabs value="home">
        <TabButtons>
          <TabButton value="home">Home</TabButton>
          <TabButton value="browse">Browse</TabButton>
          <TabButton value="collection">Collection</TabButton>
        </TabButtons>
      </Tabs>
    </NavigationBarSection>
    <NavigationBarSection>
      <Avatar size="sm" border="primary" />
    </NavigationBarSection>
  </NavigationBar>
);

export default Topbar;
