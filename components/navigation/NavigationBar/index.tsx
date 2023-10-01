import React, { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

import { twMerge } from '@/utils/twMerge';
import { Badge, BadgeColor } from '../../communication/Badge';

interface NavigationBarItemProps {
  icon: IconType;
  activeIcon?: IconType;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  badgeColor?: BadgeColor;
}

/**
 * A navigation bar item is a button that can be used to navigate between destinations within an app.
 * @param icon The icon to display in the item.
 * @param activeIcon The icon to display when the item is active.
 * @param active Whether the item is currently active.
 * @param badge Whether to display a badge on the item.
 * @param badgeText The text to display in the badge.
 * @param badgeColor The color of the badge.
 */
export const NavigationBarItem: FC<PropsWithChildren<NavigationBarItemProps>> = ({
  icon: Icon,
  activeIcon: ActiveIcon,
  active = false,
  badge,
  badgeText,
  badgeColor,
  children,
}) => (
  <div
    className={`group flex cursor-pointer flex-col items-center justify-center h-full py-3 ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}
  >
    <div
      className={`relative mx-auto flex h-8 w-16 items-center justify-center rounded-full after:absolute after:inset-0
        after:rounded-full after:opacity-0 group-hover:after:opacity-5 group-active:after:opacity-10 
        ${active ? 'bg-primary/10 after:bg-on-surface' : 'after:bg-on-surface-variant'}`}
    >
      {badge && (
        <Badge className="absolute top-0 translate-x-3" color={badgeColor}>
          {badgeText}
        </Badge>
      )}
      {active && ActiveIcon ? <ActiveIcon size={24} /> : <Icon size={24} />}
    </div>
    {children && <div className="block truncate py-1 text-label-medium">{children}</div>}
  </div>
);

interface NavigationBarProps {
  className?: string;
}

/**
 * Navigation bars offer a persistent and convenient way to switch between primary destinations in an app.
 */
export const NavigationBar: FC<PropsWithChildren<NavigationBarProps>> = ({ className, children }) => (
  <nav className={twMerge('z-10 bg-surface-low grid w-full auto-cols-fr grid-flow-col gap-2', className)}>{children}</nav>
);
