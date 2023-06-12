import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'tonal' | 'outlined' | 'elavated' | 'text';
  iconLeft?: IconType;
  iconRight?: IconType;
  children?: string;
}

const Button: FC<ButtonProps> = ({ variant = 'filled', iconLeft: IconLeft, iconRight: IconRight, children, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return `text-white bg-indigo-600 hover:bg-indigo-700 disabled:hover:bg-indigo-600
          dark:text-indigo-900 dark:bg-indigo-300 dark:hover:bg-indigo-400 dark:disabled:hover:bg-indigo-300`;
      case 'tonal':
        return `text-indigo-500 bg-indigo-100 hover:bg-indigo-200 disabled:hover:bg-indigo-100
          dark:text-indigo-400 dark:bg-indigo-400/20 dark:hover:bg-indigo-400/25 dark:disabled:hover:bg-indigo-400/20`;
      case 'outlined':
        return `bg-transparent border text-indigo-500 border-indigo-500 hover:bg-indigo-200 disabled:hover:bg-transparent
          dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-400/20`;
      case 'elavated':
        return `shadow-md text-indigo-500 bg-white hover:bg-indigo-100 disabled:hover:bg-white
          dark:text-indigo-300 dark:bg-gray-800 dark:hover:bg-indigo-400/25 dark:disabled:hover:bg-gray-800`;
      case 'text':
        return `bg-transparent text-indigo-500 hover:bg-indigo-100 disabled:hover:bg-transparent
          dark:text-indigo-400 dark:hover:bg-indigo-400/20`;
    }
  };

  const getSizeStyles = () => {
    switch (variant) {
      case 'outlined':
        return 'h-[2.375rem]';
      default:
        return 'h-10';
    }
  };

  return (
    <button
      {...props}
      className={`
        flex items-center justify-center gap-2 select-none transition-colors duration-100 rounded-full px-6 disabled:opacity-25 text-sm
        ${getVariantStyles()} ${getSizeStyles()}
      `}
    >
      {IconLeft && <IconLeft size={18} className="shrink-0" />}
      {children && <span className="truncate">{children[0].toUpperCase() + children.slice(1).toLocaleLowerCase()}</span>}
      {IconRight && <IconRight size={18} className="shrink-0" />}
    </button>
  );
};

export default Button;
