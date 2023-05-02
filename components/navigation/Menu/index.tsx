import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export interface MenuItemProps {
  Icon?: IconType;
  onClick?: () => void;
}

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ Icon, onClick, children }) => (
  <li
    onClick={onClick}
    className="select-none w-full flex items-center gap-2 h-10 px-4 text-sm font-medium truncate rounded-lg hover:bg-slate-200
        cursor-pointer group-[.compact]:text-xs group-[.compact]:h-8 group-[.compact]:px-2"
  >
    {Icon && <Icon className="h-5 w-5 shrink-0 group-[.compact]:h-4 group-[.compact]:w-4" />}
    {children}
  </li>
);

export const MenuDivider: FC = () => <hr className="border-slate-300 m-2" />;

export interface MenuProps {
  compact?: boolean;
}

const Menu: FC<PropsWithChildren<MenuProps>> = ({ compact = false, children }) => (
  <ul className={`bg-slate-100 border border-slate-300 text-slate-950 rounded-lg p-2 ${compact ? 'w-48 group compact' : 'w-60'}`}>{children}</ul>
);

export default Menu;
