import { FC, PropsWithChildren } from 'react';

export const CardBody: FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4 text-sm text-slate-600 dark:text-slate-300 dark:font-thin">{children}</div>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl mb-1 flex gap-2 items-center text-slate-950 font-medium dark:text-slate-50 dark:font-normal">{children}</h2>
);

export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="flex items-center mt-6 gap-2">{children}</div>;

interface CardProps {
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ hoverable = false, onClick, children }) => (
  <div
    onClick={onClick}
    className={`
        rounded-3xl transition-transform w-min min-w-[20rem] overflow-hidden bg-blue-50 dark:bg-slate-800
        ${onClick ? 'cursor-pointer' : ''} ${hoverable ? 'lg:hover:scale-105' : ''}
      `}
  >
    {children}
  </div>
);

export default Card;
