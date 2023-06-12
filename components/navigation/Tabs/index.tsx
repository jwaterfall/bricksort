import { FC, PropsWithChildren } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabButtons: FC<PropsWithChildren> = ({ children }) => (
  <TabsPrimitive.List className="flex h-14 w-full overflow-x-auto px-4 gap-8 scrollbar-none">{children}</TabsPrimitive.List>
);

interface TabButtonProps {
  value: string;
}

export const TabButton: FC<PropsWithChildren<TabButtonProps>> = (props) => (
  <TabsPrimitive.Trigger
    className={`
      text-sm font-medium dark:font-normal whitespace-nowrap transition-all hover:scale-105 relative text-slate-950 aria-selected:text-blue-600 aria-selected:hover:text-blue-600
      after:h-1 after:w-full after:scale-x-0 after:opacity-0 after:transition-all after:duration-100 after:bg-blue-600 after:rounded-t-md 
      dark:text-slate-50 dark:aria-selected:text-blue-300 dark:aria-selected:hover:text-blue-300 dark:after:bg-blue-300
      after:absolute after:bottom-0 after:left-0 aria-selected:after:scale-x-100 aria-selected:after:opacity-100
    `}
    {...props}
  />
);

export const TabContent = TabsPrimitive.Content;

const Tabs = TabsPrimitive.Root;

export default Tabs;
