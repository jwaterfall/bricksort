import { FC, PropsWithChildren } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabButtons: FC<PropsWithChildren> = ({ children }) => (
  <TabsPrimitive.List className="flex w-full overflow-x-auto px-4 gap-8 scrollbar-none">{children}</TabsPrimitive.List>
);

interface TabButtonProps {
  value: string;
}

export const TabButton: FC<PropsWithChildren<TabButtonProps>> = (props) => (
  <TabsPrimitive.Trigger
    className={`
      h-16 text-sm font-medium whitespace-nowrap transition-colors text-slate-500 relative hover:text-slate-900 aria-selected:text-blue-600 aria-selected:hover:text-blue-600
      after:h-1 after:w-full after:scale-x-0 after:opacity-0 after:transition-all after:duration-100 after:bg-blue-600 after:rounded-t-md 
      dark:text-slate-200 dark:hover:text-slate-50 dark:aria-selected:text-blue-300 dark:aria-selected:hover:text-blue-300 dark:after:bg-blue-300 dark:font-normal
      after:absolute after:bottom-0 after:left-0 aria-selected:after:scale-x-100 aria-selected:after:opacity-100
    `}
    {...props}
  />
);

export const TabContent = TabsPrimitive.Content;

const Tabs = TabsPrimitive.Root;

export default Tabs;
