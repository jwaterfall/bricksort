import { FC, PropsWithChildren } from 'react';

const Badge: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-1 rounded-full text-xs h-5 px-[0.4rem] w-fit bg-indigo-600 text-white dark:bg-indigo-400 dark:text-indigo-900 dark:font-medium">
    {children}
  </div>
);

export default Badge;
