import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
  color?: 'default' | 'info' | 'success' | 'error' | 'warning';
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color = 'default', children }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return 'bg-red-600 dark:bg-red-500';
      case 'info':
        return 'bg-blue-600 dark:bg-blue-500';
      case 'success':
        return 'bg-green-600 dark:bg-green-500';
      case 'error':
        return 'bg-red-600 dark:bg-red-500';
      case 'warning':
        return 'bg-amber-600 dark:bg-amber-500';
    }
  };

  return (
    <span
      className={`
        flex items-center w-fit text-slate-50 dark:text-slate-950 dark:font-medium
        rounded-full text-xs px-2 py-1 min-h-[1rem] ${getColorStyles()}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
