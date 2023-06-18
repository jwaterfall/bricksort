import { FC, PropsWithChildren } from 'react';

export const TopBarSection: FC<PropsWithChildren> = ({ children }) => (
  <header className="flex items-center justify-center gap-1.5 first:justify-start last:justify-end">{children}</header>
);

export const TopBarTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-2xl font-logo text-zinc-950 dark:text-zinc-50 mx-2">{children}</h2>
);

export const TopBar: FC<PropsWithChildren> = ({ children }) => (
  <header className="shrink-0 w-full h-20 px-8 grid grid-flow-col auto-cols-fr items-center bg-zinc-100 dark:bg-zinc-900">{children}</header>
);
