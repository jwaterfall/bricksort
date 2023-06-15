import type { Meta, StoryObj } from '@storybook/react';
import { MdAttachFile, MdCalendarToday, MdLogin, MdMenu, MdMoreVert } from 'react-icons/md';

import { Button } from '@/components/actions/Button';
import { Avatar } from '@/components/display/Avatar';
import { Tabs, TabButtons, TabButton } from '@/components/navigation/Tabs';

import TopBar, { TopBarSection, TopBarTitle } from '.';

const meta: Meta<typeof TopBar> = {
  title: 'navigation/Top Bar',
  component: TopBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const WithTitle: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarTitle>Title</TopBarTitle>
      </TopBar>
    );
  },
};

export const WithSections: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMenu} />
          <TopBarTitle>Title</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdAttachFile} />
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdCalendarToday} />
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMoreVert} />
        </TopBarSection>
      </TopBar>
    );
  },
};

export const WithCenteredTitle: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Title</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdAttachFile} />
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdCalendarToday} />
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMoreVert} />
        </TopBarSection>
      </TopBar>
    );
  },
};

export const WithButton: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Title</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Button iconLeft={MdLogin} size="sm">
            Login
          </Button>
        </TopBarSection>
      </TopBar>
    );
  },
};

export const WithAvatar: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <Button variant="ghost" shape="square" color="secondary" iconLeft={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Title</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Avatar size="sm" border="primary" src="avatar1.jpg" />
        </TopBarSection>
      </TopBar>
    );
  },
};

export const WithTabs: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <TopBarTitle>Title</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Tabs value="dashboard">
            <TabButtons>
              <TabButton value="dashboard">Dashboard</TabButton>
              <TabButton value="settings">Settings</TabButton>
              <TabButton value="profile">Profile</TabButton>
            </TabButtons>
          </Tabs>
        </TopBarSection>
        <TopBarSection>
          <Avatar size="sm" border="primary" src="avatar1.jpg" />
        </TopBarSection>
      </TopBar>
    );
  },
};
