import { FC } from 'react';
import { MdPerson } from 'react-icons/md';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { Badge } from '@/components/display/Badge';
import { PropsWithClassName } from '@/components/Props';

interface AvatarProps extends PropsWithClassName {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ring?: 'primary' | 'secondary';
  src?: string;
  name?: string;
  badgeText?: string;
}

export const Avatar: FC<AvatarProps> = ({ size = 'md', ring, src, name, badgeText, className = '' }) => {
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
        return 'animate-spin-slow animation bg-gradient-to-r from-lime-500 via-red-500 to-blue-500';
      case 'secondary':
        return 'bg-red-600 dark:bg-red-400';
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
      <AvatarPrimitive.Image className="rounded-full" src={src} />
      <AvatarPrimitive.Fallback
        className={`w-full h-full p-1 flex items-center justify-center rounded-full bg-zinc-300 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 overflow-hidden overflow-ellipsis text-center leading-tight text-xs tracking-wide dark:font-medium ${
          size === 'sm' ? 'uppercase' : 'capitalize'
        }`}
      >
        {name ? getFormattedName() : <MdPerson size={getIconSize()} />}
      </AvatarPrimitive.Fallback>
    </div>
  );

  return (
    <AvatarPrimitive.Root className={`relative flex aspect-square ${getSizeStyles()} ${className}`}>
      {badgeText && <Badge className="absolute -top-0.5 -right-0.5 z-20">{badgeText}</Badge>}
      {ring ? (
        <>
          <InnerAvatar />
          <div className={`absolute inset-0 rounded-full p-0.5 ${getRingStyles()}`}>
            <div className="absolute inset-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </>
      ) : (
        <InnerAvatar />
      )}
    </AvatarPrimitive.Root>
  );
};
