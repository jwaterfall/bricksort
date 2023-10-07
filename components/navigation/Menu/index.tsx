import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Toggle from '@/components/actions/Toggle';

export const MenuDivider: FC = () => <hr className="border-zinc-300 m-2" />;

export interface MenuItemsProps {
  compact?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const MenuItems: FC<PropsWithChildren<MenuItemsProps>> = ({ align = 'start', side = 'bottom', compact, children }) => (
  <DropdownMenu.Content
    align={align}
    side={side}
    className={`rounded-sm p-1 mt-2 z-50 marker:shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        bg-zinc-100 border border-zinc-300 text-zinc-950
        ${compact ? 'w-48 group compact' : 'w-60'} ${align === 'end' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}
      `}
  >
    {children}
  </DropdownMenu.Content>
);

interface MenuItemProps {
  Icon?: IconType;
  onClick?: () => void;
  enabled?: boolean;
  href?: string;
}

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ Icon, children, enabled, ...props }) => (
  <DropdownMenu.Item
    className="flex items-center gap-2   
        w-full p-2 text-sm truncate rounded-sm
        group-[.compact]:text-xs group-[.compact]:p-1
        ui-active:bg-zinc-200 ui-active:dark:bg-zinc-700
      "
    {...props}
  >
    {Icon && <Icon className="h-5 w-5 shrink-0 text-red-500 group-[.compact]:h-4 group-[.compact]:w-4" />}
    <span className="truncate flex-1 flex items-center gap-2 justify-between">
      {children}
      {enabled !== undefined && <Toggle enabled={enabled} size="sm" onChange={props.onClick} />}
    </span>
  </DropdownMenu.Item>
);

export const MenuTrigger = DropdownMenu.Trigger;

const Menu = DropdownMenu.Root;

export default Menu;
