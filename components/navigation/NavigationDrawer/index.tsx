import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as Separator from '@radix-ui/react-separator';

interface NavigationDrawerItemProps {
  icon: IconType;
  active?: boolean;
}

export const NavigationDrawerItem: FC<PropsWithChildren<NavigationDrawerItemProps>> = ({ icon: Icon, active = false, children }) => (
  <div
    className={`h-12 pl-4 pr-6 flex items-center gap-3 truncate rounded-full
      ${active ? 'bg-blue-100 dark:bg-indigo-500/10' : 'hover:bg-blue-100 dark:hover:bg-indigo-500/10'}
    `}
  >
    <Icon size={18} className="text-gray-500" />
    {children}
  </div>
);

export const NavigationDrawerDivider: FC = () => <Separator.Root className="m-4 h-px bg-indigo-200 dark:bg-gray-800" />;

export const NavigationDrawer: FC<PropsWithChildren> = ({ children }) => (
  <aside className="w-80 px-3 flex flex-col text-sm text-gray-950 dark:text-gray-50 bg-blue-50 dark:bg-gray-900">{children}</aside>
);
