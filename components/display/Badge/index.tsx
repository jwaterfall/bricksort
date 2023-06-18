import { FC, PropsWithChildren } from 'react';

import { PropsWithClassName } from '@/components/Props';

export const Badge: FC<PropsWithChildren<PropsWithClassName>> = ({ className = '', children }) => (
  <div
    className={`
      flex items-center gap-1 rounded-full text-xs h-4 px-1 w-fit font-thin dark:font-medium
      bg-red-500 text-zinc-50 dark:bg-red-400 dark:text-red-950 ${className}
    `}
  >
    {children}
  </div>
);
