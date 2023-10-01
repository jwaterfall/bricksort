import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as Separator from '@radix-ui/react-separator';

import { twMerge } from '@/utils/twMerge';

interface NavigationDrawerItemProps {
  icon: IconType;
  active?: boolean;
}

export const NavigationDrawerItem: FC<PropsWithChildren<NavigationDrawerItemProps>> = ({ icon: Icon, active = false, children }) => (
  <div
    className={`text-label-large after:bg-on-surface relative flex h-12 w-full items-center gap-3 truncate rounded-full pl-4 pr-6 after:absolute after:inset-0 after:opacity-0
      ${active ? 'bg-primary/10' : 'hover:after:opacity-5 active:after:opacity-10'}`}
  >
    <Icon size={18} className="text-on-surface-variant" />
    {children}
  </div>
);

export const NavigationDrawerDivider: FC = () => <Separator.Root className="bg-surface-low m-4 h-px" />;

export const NavigationDrawerHeader: FC<PropsWithChildren> = ({ children }) => (
  <h4 className="text-on-surface-variant text-title-small flex items-center gap-4 p-4">{children}</h4>
);

interface NavigationDrawerProps {
  className?: string;
}

export const NavigationDrawer: FC<PropsWithChildren<NavigationDrawerProps>> = ({ className, children }) => (
  <aside className={twMerge('bg-surface-0 text-on-surface min-h-full w-80 px-3 py-4 text-sm font-medium', className)}>{children}</aside>
);
