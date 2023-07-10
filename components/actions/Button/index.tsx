import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { twMerge } from "@/utils/twMerge";

export const buttonVariantStyles = cva(
  `text-label-large relative inline-flex h-10 select-none items-center justify-center gap-2
    overflow-hidden rounded-full px-6 transition-colors duration-100 disabled:text-on-surface/40
    disabled:after:opacity-0 disabled:shadow-none after:absolute after:inset-0 after:bg-current
    after:opacity-0 hover:after:opacity-5 active:after:opacity-10`,
  {
    variants: {
      color: { primary: "", info: "", success: "", warning: "", error: "" },
      variant: {
        filled: "",
        tonal: "",
        outlined: "border border-current bg-transparent",
        elevated: "bg-surface-low shadow-elevation-1 hover:shadow-elevation-2 active:shadow-elevation-1",
        text: "bg-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        color: "primary",
        className: "bg-primary text-on-primary",
      },
      {
        variant: "filled",
        color: "info",
        className: "bg-info text-on-info",
      },
      {
        variant: "filled",
        color: "success",
        className: "bg-success text-on-success",
      },
      {
        variant: "filled",
        color: "warning",
        className: "bg-warning text-on-warning",
      },
      {
        variant: "filled",
        color: "error",
        className: "bg-error text-on-error",
      },
      {
        variant: "tonal",
        color: "primary",
        className: "bg-primary/10",
      },
      {
        variant: "tonal",
        color: "info",
        className: "bg-info/10",
      },
      {
        variant: "tonal",
        color: "success",
        className: "bg-success/10",
      },
      {
        variant: "tonal",
        color: "warning",
        className: "bg-warning/10",
      },
      {
        variant: "tonal",
        color: "error",
        className: "bg-error/10",
      },
      {
        variant: ["tonal", "outlined", "elevated", "text"],
        color: "primary",
        className: "text-primary",
      },
      {
        variant: ["tonal", "outlined", "elevated", "text"],
        color: "info",
        className: "text-info",
      },
      {
        variant: ["tonal", "outlined", "elevated", "text"],
        color: "success",
        className: "text-success",
      },
      {
        variant: ["tonal", "outlined", "elevated", "text"],
        color: "warning",
        className: "text-warning",
      },
      {
        variant: ["tonal", "outlined", "elevated", "text"],
        color: "error",
        className: "text-error",
      },
      {
        variant: ["filled", "tonal", "elevated", "text"],
        className: "disabled:bg-on-surface/10",
      },
      {
        variant: ["outlined"],
        className: "disabled:border-on-surface/10",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "filled",
    },
  }
);

export type ButtonColor = "primary" | "info" | "success" | "warning" | "error";
export type ButtonVariant = "filled" | "tonal" | "outlined" | "elevated" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariantStyles> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  iconLeft?: IconType;
  iconRight?: IconType;
  children?: string;
  className?: string;
}

/**
 * Buttons help people take action, such as sending an email, sharing a document, or liking a comment.
 * @param color The color of the button. Defaults to "primary".
 * @param variant The visual style of the button. Defaults to "filled".
 * @param iconLeft An optional icon to display on the left side of the button.
 * @param iconRight An optional icon to display on the right side of the button.
 * @param children The text to display inside the button.
 * @param onClick A callback function to be called when the button is clicked.
 * @param disabled Whether or not the button is disabled. Defaults to false.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, variant, iconLeft: IconLeft, iconRight: IconRight, children, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={twMerge(buttonVariantStyles({ color, variant }), IconLeft ? "pl-4" : "", IconRight ? "pr-4" : "", className)}
    >
      {IconLeft && <IconLeft size={18} className="shrink-0" />}
      {children && <span className="truncate">{children}</span>}
      {IconRight && <IconRight size={18} className="shrink-0" />}
    </button>
  )
);
