import { FC, PropsWithChildren } from 'react';

export const TopBarSection: FC<PropsWithChildren> = ({ children }) => (
  <header className="flex items-center justify-center gap-2 first:justify-start last:justify-end">{children}</header>
);

export const TopBarTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="font-logo text-title-large text-on-surface">{children}</h2>
);

export const TopAppBar: FC<PropsWithChildren> = ({ children }) => (
  <header className="bg-background grid h-20 w-full shrink-0 auto-cols-fr grid-flow-col items-center px-8">{children}</header>
);
