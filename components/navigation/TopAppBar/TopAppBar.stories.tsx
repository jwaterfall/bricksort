import type { Meta, StoryObj } from '@storybook/react';
import { MdAttachFile, MdCalendarToday, MdMenu, MdMoreVert } from 'react-icons/md';

import { Avatar } from '@/components/communication/Avatar';
import { IconButton } from '@/components/actions/IconButton';

import { TopAppBar, TopBarSection, TopBarTitle } from '.';

const meta: Meta<typeof TopAppBar> = {
  title: 'navigation/Top App Bar',
  component: TopAppBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const WithTitle: Story = {
  render(args) {
    return (
      <TopAppBar {...args}>
        <TopBarTitle>Bricksort</TopBarTitle>
      </TopAppBar>
    );
  },
};

export const WithSections: Story = {
  render(args) {
    return (
      <TopAppBar {...args}>
        <TopBarSection>
          <IconButton variant="text" icon={MdMenu} />
          <TopBarTitle>Bricksort</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <IconButton variant="text" icon={MdAttachFile} />
          <IconButton variant="text" icon={MdCalendarToday} />
          <IconButton variant="text" icon={MdMoreVert} />
        </TopBarSection>
      </TopAppBar>
    );
  },
};

export const WithCenteredTitle: Story = {
  render(args) {
    return (
      <TopAppBar {...args}>
        <TopBarSection>
          <IconButton variant="text" icon={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Bricksort</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <IconButton variant="text" icon={MdAttachFile} />
          <IconButton variant="text" icon={MdCalendarToday} />
          <IconButton variant="text" icon={MdMoreVert} />
        </TopBarSection>
      </TopAppBar>
    );
  },
};

export const WithAvatar: Story = {
  render(args) {
    return (
      <TopAppBar {...args}>
        <TopBarSection>
          <IconButton variant="text" icon={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Bricksort</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Avatar size="sm" src="avatar3.jpg" />
        </TopBarSection>
      </TopAppBar>
    );
  },
};
