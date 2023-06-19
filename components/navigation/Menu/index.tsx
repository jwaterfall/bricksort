import { FC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

interface MenuProps {
    trigger: JSX.Element;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

export const Menu: FC<PropsWithChildren<MenuProps>> = ({ trigger, children, ...props }) => (
    <DropdownMenuPrimitive.Root modal={false}>
        <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={8}
                {...props}
                className="py-2 min-w-[14rem] max-w-[18rem] rounded-[0.25rem] bg-zinc-100 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 shadow-sm"
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

export const MenuItem: FC<MenuItemProps> = ({ icon: Icon, rightElement, children, ...props }) => (
    <DropdownMenuPrimitive.Item
        {...props}
        className="px-3 h-12 flex items-center gap-3 outline-none font-medium dark:font-normal text-zinc-950 dark:text-zinc-50 data-[highlighted]:bg-zinc-200 dark:data-[highlighted]:bg-zinc-700"
    >
        {Icon && <Icon size={18} />}
        <span className="flex-1 text-sm">{children}</span>
        <span className="text-xs text-zinc-500">{rightElement}</span>
    </DropdownMenuPrimitive.Item>
);

export const MenuDivider: FC = () => <DropdownMenuPrimitive.Separator className="" />;
