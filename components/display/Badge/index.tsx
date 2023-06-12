import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
  color?: 'default' | 'info' | 'success' | 'error' | 'warning';
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color = 'default', children }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return 'bg-gray-300 dark:bg-gray-700 text-gray-950 dark:text-gray-50 font-medium dark:font-normal';
      case 'info':
        return 'bg-blue-600 dark:bg-blue-500 text-gray-50';
      case 'success':
        return 'bg-green-600 dark:bg-green-500 text-gray-50';
      case 'error':
        return 'bg-red-600 dark:bg-red-500 text-gray-50';
      case 'warning':
        return 'bg-amber-600 dark:bg-amber-500 text-gray-50';
    }
  };

  return <div className={`flex items-center rounded-full text-xs h-6 px-2 w-fit ${getColorStyles()}`}>{children}</div>;
};

export default Badge;
