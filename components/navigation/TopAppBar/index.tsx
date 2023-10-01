import { FC, PropsWithChildren } from 'react';

import { twMerge } from '@/utils/twMerge';

export const TopBarSection: FC<PropsWithChildren> = ({ children }) => (
  <header className="flex items-center justify-center gap-2 first:justify-start last:justify-end">{children}</header>
);

export const TopBarTitle: FC<PropsWithChildren> = ({ children }) => <h2 className="font-logo text-title-large text-on-surface">{children}</h2>;

interface TopAppBarProps {
  className?: string;
}

export const TopAppBar: FC<PropsWithChildren<TopAppBarProps>> = ({ className, children }) => (
  <header className={twMerge('z-10 bg-background grid h-20 w-full shrink-0 auto-cols-fr grid-flow-col items-center px-4', className)}>
    {children}
  </header>
);
