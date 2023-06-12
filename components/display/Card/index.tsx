import { FC, PropsWithChildren } from 'react';

export const CardBody: FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4 text-sm text-gray-600 dark:text-gray-300 dark:font-thin">{children}</div>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl mb-1 flex gap-2 items-center text-gray-950 font-medium dark:text-gray-50 dark:font-normal">{children}</h2>
);

export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="flex items-center mt-6 gap-2">{children}</div>;

const Card: FC<PropsWithChildren> = ({ children }) => (
  <div className="rounded-3xl transition-transform w-min min-w-[20rem] overflow-hidden bg-white dark:bg-gray-800 shadow-sm">{children}</div>
);

export default Card;
