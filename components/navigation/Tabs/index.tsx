import { FC, PropsWithChildren } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export const TabButtons: FC<PropsWithChildren> = ({ children }) => (
  <RadixTabs.List
    className="
      flex w-full
      group-[.line]:border-b group-[.line]:border-zinc-300 group-[.line]:dark:border-zinc-700 group-[.line]:gap-8
      group-[.solid]:justify-center group-[.solid]:bg-zinc-300 group-[.solid]:dark:bg-zinc-800 group-[.solid]:gap-2
      group-[.solid]:rounded-sm group-[.solid]:p-0.5
    "
  >
    {children}
  </RadixTabs.List>
);

interface TabButtonProps {
  value: string;
}

export const TabButton: FC<PropsWithChildren<TabButtonProps>> = (props) => (
  <RadixTabs.Trigger
    className={`
      h-8 text-sm rounded-sm transition text-zinc-800 hover:text-zinc-950
      group-[.line]:aria-selected:after:h-2 group-[.line]:aria-selected:after:w-full group-[.line]:aria-selected:after:bg-zinc-950 group-[.line]:aria-selected:after:rounded-t-md
      group-[.solid]:flex-1 group-[.solid]:px-6
      group-[.solid]:aria-selected:bg-zinc-400 group-[.solid]:dark:aria-selected:bg-zinc-700
      group-[.solid]:aria-selected:text-zinc-950 group-[.solid]:aria-selected:dark:text-zinc-50
    `}
    {...props}
  />
);

export const TabContent = RadixTabs.Content;

interface TabsProps {
  variant?: 'line' | 'solid';
  value: string;
  onValueChange: (value: string) => void;
}

const Tabs: FC<PropsWithChildren<TabsProps>> = ({ variant = 'line', ...props }) => {
  return <RadixTabs.Root {...props} className={`group ${variant}`} />;
};

export default Tabs;
