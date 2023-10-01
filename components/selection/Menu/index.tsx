import React, { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

interface MenuProps {
  trigger: JSX.Element;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

/**
 * Menus display a list of choices on a temporary surface.
 * @param trigger The element that will trigger the menu to open.
 * @param side The side of the trigger to display the menu on.
 * @param align The alignment of the menu relative to the trigger.
 */
export const Menu: FC<PropsWithChildren<MenuProps>> = ({ trigger, children, ...props }) => (
  <DropdownMenuPrimitive.Root modal={false}>
    <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={8}
        {...props}
        className="min-w-[14rem] max-w-[18rem] rounded-[0.25rem] bg-inverse-surface py-2 shadow-sm border border-inverse-on-surface/10"
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);

interface MenuItemProps {
  icon?: IconType;
  rightElement?: JSX.Element | string;
  disabled?: boolean;
  onSelect?: () => void;
  children: string;
}

/**
 * A selectable item in a menu.
 * @param icon An optional icon to display next to the item text.
 * @param rightElement An optional element to display on the right side of the item.
 * @param disabled Whether the item is disabled and cannot be selected.
 * @param onSelect A callback function to be called when the item is selected.
 * @param children The text content of the item.
 */
export const MenuItem: FC<MenuItemProps> = ({ icon: Icon, rightElement, children, ...props }) => (
  <DropdownMenuPrimitive.Item
    {...props}
    className="flex h-12 items-center gap-3 px-3 text-label-large text-inverse-on-surface-variant outline-none data-[highlighted]:bg-inverse-on-surface/10"
  >
    {Icon && <Icon size={18} />}
    <span className="flex-1 text-inverse-on-surface">{children}</span>
    <span className="text-xs">{rightElement}</span>
  </DropdownMenuPrimitive.Item>
);

export const MenuDivider: FC = () => <DropdownMenuPrimitive.Separator className="h-px bg-surface-high" />;
