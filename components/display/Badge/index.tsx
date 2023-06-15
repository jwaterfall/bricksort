import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
  className?: string;
}

export const Badge: FC<PropsWithChildren<BadgeProps>> = ({ className, children }) => (
  <div
    className={`
      flex items-center gap-1 rounded-full text-xs h-4 px-1 w-fit font-thin dark:font-medium
      bg-lime-600 text-white dark:bg-lime-400 dark:text-lime-950 ${className}
    `}
  >
    {children}
  </div>
);
