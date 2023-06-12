import type { Meta, StoryObj } from '@storybook/react';
import { MdAttachFile, MdCalendarToday, MdLogin, MdMenu, MdMoreVert } from 'react-icons/md';

import Button from '@/components/actions/Button';
import Avatar from '@/components/display/Avatar';
import Tabs, { TabButtons, TabButton } from '@/components/navigation/Tabs';

import NavigationBar, { NavigationBarSection, NavigationBarTitle } from '.';

const meta: Meta<typeof NavigationBar> = {
  title: 'navigation/Navigation Bar',
  component: NavigationBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const WithTitle: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarTitle>Title</NavigationBarTitle>
      </NavigationBar>
    );
  },
};

export const WithSections: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMenu} />
          <NavigationBarTitle>Title</NavigationBarTitle>
        </NavigationBarSection>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdAttachFile} />
          <Button variant="ghost" shape="square" color="secondary" Icon={MdCalendarToday} />
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMoreVert} />
        </NavigationBarSection>
      </NavigationBar>
    );
  },
};

export const WithCenteredTitle: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMenu} />
        </NavigationBarSection>
        <NavigationBarSection>
          <NavigationBarTitle>Title</NavigationBarTitle>
        </NavigationBarSection>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdAttachFile} />
          <Button variant="ghost" shape="square" color="secondary" Icon={MdCalendarToday} />
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMoreVert} />
        </NavigationBarSection>
      </NavigationBar>
    );
  },
};

export const WithButton: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMenu} />
        </NavigationBarSection>
        <NavigationBarSection>
          <NavigationBarTitle>Title</NavigationBarTitle>
        </NavigationBarSection>
        <NavigationBarSection>
          <Button Icon={MdLogin} size="sm">
            Login
          </Button>
        </NavigationBarSection>
      </NavigationBar>
    );
  },
};

export const WithAvatar: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarSection>
          <Button variant="ghost" shape="square" color="secondary" Icon={MdMenu} />
        </NavigationBarSection>
        <NavigationBarSection>
          <NavigationBarTitle>Title</NavigationBarTitle>
        </NavigationBarSection>
        <NavigationBarSection>
          <Avatar size="sm" border="primary" src="avatar1.jpg" />
        </NavigationBarSection>
      </NavigationBar>
    );
  },
};

export const WithTabs: Story = {
  render(args) {
    return (
      <NavigationBar {...args}>
        <NavigationBarSection>
          <NavigationBarTitle>Title</NavigationBarTitle>
        </NavigationBarSection>
        <NavigationBarSection>
          <Tabs value="dashboard">
            <TabButtons>
              <TabButton value="dashboard">Dashboard</TabButton>
              <TabButton value="settings">Settings</TabButton>
              <TabButton value="profile">Profile</TabButton>
            </TabButtons>
          </Tabs>
        </NavigationBarSection>
        <NavigationBarSection>
          <Avatar size="sm" border="primary" src="avatar1.jpg" />
        </NavigationBarSection>
      </NavigationBar>
    );
  },
};
