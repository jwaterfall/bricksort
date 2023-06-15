import { FC, PropsWithChildren } from 'react';

export const TopBarSection: FC<PropsWithChildren> = ({ children }) => (
  <header className="flex items-center justify-center gap-2 first:justify-start last:justify-end">{children}</header>
);

export const TopBarTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl dark:font-thin text-gray-950 dark:text-gray-50 mx-2">{children}</h2>
);

export const TopBar: FC<PropsWithChildren> = ({ children }) => (
  <header className="w-full h-14 px-2 grid grid-flow-col auto-cols-fr items-center bg-blue-50 dark:bg-gray-900">{children}</header>
);
