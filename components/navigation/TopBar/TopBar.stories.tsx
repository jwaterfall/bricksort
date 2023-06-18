import type { Meta, StoryObj } from '@storybook/react';
import { MdAttachFile, MdCalendarToday, MdMenu, MdMoreVert } from 'react-icons/md';

import { Avatar } from '@/components/display/Avatar';
import { IconButton } from '@/components/actions/IconButton';

import { TopBar, TopBarSection, TopBarTitle } from '.';

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
        <TopBarTitle>Bricksort</TopBarTitle>
      </TopBar>
    );
  },
};

export const WithSections: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <IconButton variant="text" icon={MdMenu} />
          <TopBarTitle>Bricksort</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <IconButton variant="text" icon={MdAttachFile} />
          <IconButton variant="text" icon={MdCalendarToday} />
          <IconButton variant="text" icon={MdMoreVert} />
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
      </TopBar>
    );
  },
};

export const WithAvatar: Story = {
  render(args) {
    return (
      <TopBar {...args}>
        <TopBarSection>
          <IconButton variant="text" icon={MdMenu} />
        </TopBarSection>
        <TopBarSection>
          <TopBarTitle>Bricksort</TopBarTitle>
        </TopBarSection>
        <TopBarSection>
          <Avatar size="sm" src="avatar3.jpg" />
        </TopBarSection>
      </TopBar>
    );
  },
};
