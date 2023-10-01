import { FC, PropsWithChildren } from 'react';

import { twMerge } from '@/utils/twMerge';

export const CardBody: FC<PropsWithChildren> = ({ children }) => <div className="text-body-medium text-on-surface-variant my-4 px-4">{children}</div>;

interface CardTitleProps {
  truncate?: boolean;
}

export const CardTitle: FC<PropsWithChildren<CardTitleProps>> = ({ truncate = false, children }) => (
  <h2 className={`text-title-large text-on-surface mb-1 flex items-center gap-2 ${truncate ? 'truncate' : ''}`}>{children}</h2>
);

export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="my-3 flex items-center justify-end gap-2 px-4">{children}</div>;

interface CardProps {
  className?: string;
}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, className }) => (
  <div className={twMerge('bg-surface-low overflow-hidden rounded-lg border border-on-surface/5', className)}>{children}</div>
);
