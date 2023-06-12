import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

interface AppBarItemProps {
  Icon: IconType;
  active?: boolean;
}

export const AppBarItem: FC<PropsWithChildren<AppBarItemProps>> = ({ Icon, active = false, children }) => (
  <div
    className={`p-4 whitespace-nowrap cursor-pointer text-xs text-center font-medium dark:font-normal ${
      active ? 'text-gray-950 dark:text-gray-50' : 'text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-gray-50'
    }`}
  >
    <div className={`w-fit mx-auto px-5 py-1 rounded-full ${active ? 'bg-gray-300 dark:bg-gray-800' : ''}`}>
      <Icon size={24} className="mx-auto" />
    </div>
    <div className="block mt-1">{children}</div>
  </div>
);

const AppBar: FC<PropsWithChildren> = ({ children }) => (
  <nav className="w-full grid grid-flow-col auto-cols-fr bg-blue-50 dark:bg-gray-900">{children}</nav>
);

export default AppBar;
