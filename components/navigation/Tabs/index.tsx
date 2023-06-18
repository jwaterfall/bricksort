import { FC, PropsWithChildren } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabButtons: FC<PropsWithChildren> = ({ children }) => (
  <TabsPrimitive.List className="grid grid-flow-col auto-cols-fr h-14 w-full overflow-x-auto scrollbar-none">{children}</TabsPrimitive.List>
);

interface TabButtonProps {
  value: string;
}

export const TabButton: FC<PropsWithChildren<TabButtonProps>> = (props) => (
  <TabsPrimitive.Trigger
    className={`
     text-zinc-950 aria-selected:text-red-500 aria-selected:hover:text-red-500 after:bg-red-500 hover:bg-zinc-200
     dark:text-zinc-50 dark:aria-selected:text-red-400 dark:aria-selected:hover:text-red-400 dark:after:bg-red-400 dark:hover:bg-zinc-800
      text-sm font-medium dark:font-normal whitespace-nowrap transition-colors relative
      after:h-1 after:w-1/2 after:translate-x-1/2 after:scale-x-0 after:opacity-0 after:transition-all after:duration-100 after:rounded-t-md 
      after:absolute after:bottom-0 after:left-0 aria-selected:after:scale-x-100 aria-selected:after:opacity-100
    `}
    {...props}
  />
);

export const TabContent = TabsPrimitive.Content;

export const Tabs = TabsPrimitive.Root;
