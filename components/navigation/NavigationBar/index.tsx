import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

import { Badge } from '@/components/display/Badge';

interface NavigationBarItemProps {
  icon: IconType;
  active?: boolean;
  badgeText?: string;
}

export const NavigationBarItem: FC<PropsWithChildren<NavigationBarItemProps>> = ({ icon: Icon, active = false, badgeText, children }) => (
  <div className="whitespace-nowrap cursor-pointer text-xs text-center font-medium dark:font-normal text-zinc-950 dark:text-zinc-50">
    <div
      className={`relative mx-auto w-16 h-8 flex items-center justify-center rounded-full ${
        active ? 'bg-zinc-200 dark:bg-zinc-700' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
      }`}
    >
      {badgeText && <Badge className="absolute -top-0.5 right-0.5 z-20">{badgeText}</Badge>}
      <Icon size={24} />
    </div>
    {children && <div className="block py-1">{children}</div>}
  </div>
);

export const NavigationBar: FC<PropsWithChildren> = ({ children }) => (
  <nav className="h-20 w-full grid grid-flow-col auto-cols-fr gap-2 items-center bg-zinc-50 dark:bg-zinc-800">{children}</nav>
);
