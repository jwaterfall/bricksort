import { FC, PropsWithChildren } from 'react';

export const CardBody: FC<PropsWithChildren> = ({ children }) => (
  <div className="px-4 my-4 text-sm text-gray-600 dark:text-gray-300 dark:font-thin">{children}</div>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl mb-1 flex gap-2 items-center text-gray-950 dark:text-gray-50">{children}</h2>
);

export const CardSubtitle: FC<PropsWithChildren> = ({ children }) => (
  <h3 className="text-sm mb-2 text-gray-700 dark:text-gray-100 font-normal">{children}</h3>
);

export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="px-4 my-3 flex items-center justify-end gap-2">{children}</div>;

export const Card: FC<PropsWithChildren> = ({ children }) => (
  <div className="rounded-3xl w-min min-w-[20rem] overflow-hidden bg-white dark:bg-gray-800 shadow-sm">{children}</div>
);
