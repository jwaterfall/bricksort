import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

interface MenuItemProps {
  Icon?: IconType;
  onClick?: () => void;
  active?: boolean;
}

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ Icon, onClick, active = false, children }) => (
  <li
    onClick={onClick}
    className={`select-none w-full flex items-center gap-2 h-10 px-4 text-sm font-medium truncate 
      rounded-lg hover:bg-zinc-200 cursor-pointer group-[.compact]:text-xs dark:hover:bg-zinc-700
      group-[.compact]:h-8 group-[.compact]:px-2 ${active ? 'text-red-500' : ''}
    `}
  >
    {Icon && <Icon className="h-5 w-5 shrink-0 group-[.compact]:h-4 group-[.compact]:w-4" />}
    {children}
  </li>
);

export const MenuDivider: FC = () => <hr className="border-zinc-300 m-2 dark:border-zinc-700" />;

export interface MenuProps {
  compact?: boolean;
}

const Menu: FC<PropsWithChildren<MenuProps>> = ({ compact = false, children }) => (
  <ul
    className={`bg-zinc-100 border border-zinc-300 text-zinc-950 rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50
  ${compact ? 'w-48 group compact' : 'w-60'}`}
  >
    {children}
  </ul>
);

export default Menu;
