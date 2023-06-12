import { FC, PropsWithChildren } from 'react';

export const NavigationBarSection: FC<PropsWithChildren> = ({ children }) => (
  <header className="flex items-center justify-center gap-2 first:justify-start last:justify-end">{children}</header>
);

export const NavigationBarTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl dark:font-thin text-slate-950 dark:text-slate-50 mx-2">{children}</h2>
);

const NavigationBar: FC<PropsWithChildren> = ({ children }) => (
  <header className="w-full h-14 px-2 grid grid-flow-col auto-cols-fr items-center bg-blue-50 dark:bg-slate-800">{children}</header>
);

export default NavigationBar;
