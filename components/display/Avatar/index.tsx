import { FC, PropsWithChildren } from 'react';
import { MdPerson } from 'react-icons/md';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  border?: 'primary' | 'secondary';
  src?: string;
  initials?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'md', border, src, initials }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-10';
      case 'md':
        return 'h-12';
      case 'lg':
        return 'h-16';
    }
  };

  const getBorderStyles = () => {
    switch (border) {
      case 'primary':
        return 'p-0.5 border-2 border-blue-700 dark:border-blue-300';
      case 'secondary':
        return 'p-0.5 border-2 border-slate-400 dark:border-slate-600';
    }
  };

  const getInitialstyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs font-thin';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 22;
      case 'lg':
        return 28;
    }
  };

  return (
    <div className={`aspect-square rounded-full ${getSizeStyles()} ${getBorderStyles()}`}>
      {src ? (
        <img className="rounded-full" src={src} />
      ) : (
        <div className="w-full h-full p-1 flex items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800">
          {initials ? <span className={`uppercase truncate ${getInitialstyles()}`}>{initials}</span> : <MdPerson size={getIconSize()} />}
        </div>
      )}
    </div>
  );
};

export default Avatar;
