import { FC, PropsWithChildren } from 'react';

import { PropsWithWidth } from '@/components/Props';

export const CardBody: FC<PropsWithChildren> = ({ children }) => (
    <div className="px-4 my-4 text-sm text-zinc-600 dark:text-zinc-300 dark:font-thin">{children}</div>
);

interface CardTitleProps {
    truncate?: boolean;
}

export const CardTitle: FC<PropsWithChildren<CardTitleProps>> = ({ truncate = false, children }) => (
    <h2 className={`text-xl mb-1 text-zinc-950 dark:text-zinc-50 ${truncate ? 'truncate' : ''}`}>{children}</h2>
);

export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="px-4 my-3 flex items-center justify-end gap-2">{children}</div>;

export const Card: FC<PropsWithChildren<PropsWithWidth>> = ({ width = 'w-80', children }) => (
    <div className={`rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 ${width}`}>{children}</div>
);
