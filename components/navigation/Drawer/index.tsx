import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

interface DrawerItemProps {
  Icon?: IconType;
  active?: boolean;
}

export const DrawerItem: FC<PropsWithChildren<DrawerItemProps>> = ({ children, Icon, active = false }) => (
  <div className="text-xl dark:font-thin text-gray-950 dark:text-gray-50 mx-2">
    {Icon && <Icon size={24} />}
    {children}
  </div>
);

const Drawer: FC<PropsWithChildren> = ({ children }) => <aside className="w-72 bg-blue-50 dark:bg-gray-900">{children}</aside>;

export default Drawer;
