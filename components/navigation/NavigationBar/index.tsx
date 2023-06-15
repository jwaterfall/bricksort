import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

import { Badge } from '@/components/display/Badge';

interface NavigationBarItemProps {
  icon: IconType;
  active?: boolean;
  badgeText?: string;
}

export const NavigationBarItem: FC<PropsWithChildren<NavigationBarItemProps>> = ({ icon: Icon, active = false, badgeText, children }) => (
  <div className="whitespace-nowrap cursor-pointer text-xs text-center font-medium dark:font-normal text-gray-950 dark:text-gray-50">
    <div
      className={`relative mx-auto w-16 h-8 flex items-center justify-center rounded-full ${
        active ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {badgeText && <Badge className="absolute -top-0.5 right-0.5 z-20">{badgeText}</Badge>}
      <Icon size={24} />
    </div>
    {children && <div className="block py-1">{children}</div>}
  </div>
);

export const NavigationBar: FC<PropsWithChildren> = ({ children }) => (
  <nav className="h-20 w-full grid grid-flow-col auto-cols-fr gap-2 items-center bg-white dark:bg-gray-800">{children}</nav>
);
