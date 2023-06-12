import { FC, PropsWithChildren } from 'react';
import { MdPerson } from 'react-icons/md';

interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ring?: 'primary' | 'secondary';
  src?: string;
  name?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'md', ring, src, name }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return 'h-8';
      case 'sm':
        return 'h-10';
      case 'md':
        return 'h-12';
      case 'lg':
        return 'h-16';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'xs':
        return 12;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
    }
  };

  const getRingStyles = () => {
    switch (ring) {
      case 'primary':
        return 'bg-blue-700 dark:bg-blue-300';
      case 'secondary':
        return 'animate-spin-slow animation bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 dark:from-green-300 dark:via-blue-500 dark:to-purple-600';
    }
  };

  const getFormattedName = () => {
    if (!name) return undefined;

    switch (size) {
      case 'xs':
        return name[0];
      case 'sm':
        return name
          .split(' ')
          .map((n) => n[0])
          .join('');
      case 'md':
        return name.split(' ')[0];
      case 'lg':
        return name;
    }
  };

  const InnerAvatar: FC = () => (
    <div className={`absolute z-10 ${!ring ? 'inset-0' : 'inset-1'}`}>
      {src ? (
        <img className="rounded-full" src={src} />
      ) : (
        <div className="w-full h-full p-1 flex items-center justify-center rounded-full bg-gray-300 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
          {name ? (
            <span
              className={`overflow-hidden overflow-ellipsis text-center leading-tight text-xs tracking-wide dark:font-medium ${
                size === 'sm' ? 'uppercase' : 'capitalize'
              }`}
            >
              {getFormattedName()}
            </span>
          ) : (
            <MdPerson size={getIconSize()} />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`relative flex aspect-square ${getSizeStyles()}`}>
      {ring ? (
        <>
          <InnerAvatar />
          <div className={`absolute inset-0 rounded-full p-0.5 ${getRingStyles()}`}>
            <div className="absolute inset-0.5 rounded-full bg-blue-50 dark:bg-gray-900" />
          </div>
        </>
      ) : (
        <InnerAvatar />
      )}
    </div>
  );
};

export default Avatar;
