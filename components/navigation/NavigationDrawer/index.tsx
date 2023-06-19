import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as Separator from '@radix-ui/react-separator';

import { PropsWithClassName } from '@/components/Props';

interface NavigationDrawerItemProps {
    icon: IconType;
    active?: boolean;
}

export const NavigationDrawerItem: FC<PropsWithChildren<NavigationDrawerItemProps>> = ({ icon: Icon, active = false, children }) => (
    <div
        className={`h-12 pl-4 pr-6 flex items-center gap-3 truncate rounded-full
      ${active ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}
    `}
    >
        <Icon size={18} className="text-zinc-600 dark:text-zinc-500" />
        {children}
    </div>
);

export const NavigationDrawerDivider: FC = () => <Separator.Root className="m-4 h-px bg-zinc-200 dark:bg-zinc-800" />;

export const NavigationDrawer: FC<PropsWithChildren<PropsWithClassName>> = ({ className = '', children }) => (
    <aside className={`w-80 px-3 text-sm font-medium dark:font-normal text-zinc-950 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-900 ${className}`}>
        {children}
    </aside>
);
