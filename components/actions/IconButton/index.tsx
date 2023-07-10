import React, { forwardRef } from 'react';
import { IconType } from 'react-icons';

import { twMerge } from '@/utils/twMerge';
import { buttonVariantStyles, ButtonProps } from '../Button';

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconLeft' | 'iconRight'> {
    icon: IconType;
}

/**
 * Icon buttons help people take supplementary actions with a single tap.
 * @param color The color of the button. Defaults to "primary".
 * @param variant The visual style of the button. Defaults to "filled".
 * @param icon The icon to display inside the button.
 * @param onClick A callback function to be called when the button is clicked.
 * @param disabled Whether or not the button is disabled. Defaults to false.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ color, variant, icon: Icon, className, ...props }, ref) => (
    <button {...props} ref={ref} className={twMerge(buttonVariantStyles({ color, variant }), 'aspect-square p-0', className)}>
        <Icon size={18} className="shrink-0" />
    </button>
));
