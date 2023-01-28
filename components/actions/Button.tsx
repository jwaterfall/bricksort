import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

export type ButtonColor = "default" | "primary" | "info" | "success" | "warning" | "error";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonShape = "default" | "square" | "circle";
export type ButtonVariant = "solid" | "outline";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    size?: ButtonSize;
    shape?: ButtonShape;
    variant?: ButtonVariant;
    Icon?: IconType;
    isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
    color = "default",
    size = "md",
    shape = "default",
    variant = "solid",
    Icon,
    isFullWidth = false,
    children,
    ...props
}) => {
    const getColorStyles = () => {
        switch (color) {
            case "default":
                return `border-slate-300 ${variant === "outline" ? "text-slate-200 hover:bg-slate-200" : "bg-slate-200"}`;
            case "primary":
                return `border-red-500 ${variant === "outline" ? "text-red-500 hover:bg-red-500" : "bg-red-500"}`;
            case "info":
                return `border-blue-500 ${variant === "outline" ? "text-blue-500 hover:bg-blue-500" : "bg-blue-500"}`;
            case "success":
                return `border-green-500 ${variant === "outline" ? "text-green-500 hover:bg-green-500" : "bg-green-500"}`;
            case "warning":
                return ` border-yellow-500 ${variant === "outline" ? "text-orange-400 hover:bg-orange-400" : "bg-orange-400"}`;
            case "error":
                return `border-red-500 ${variant === "outline" ? "text-red-500 hover:bg-red-500" : "bg-red-500"}`;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "xs":
                return "text-xs px-2 h-8";
            case "sm":
                return "text-sm px-3 h-10";
            case "md":
                return "text-sm px-4 h-12";
            case "lg":
                return "text-lg px-6 h-16";
        }
    };

    const getShapeStyles = () => {
        switch (shape) {
            case "default":
                return "";
            case "square":
                return "px-0 aspect-square";
            case "circle":
                return "rounded-full px-0 aspect-square";
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case "solid":
                return `font-medium ${color === "default" ? "text-slate-800 " : "text-slate-50 font-medium"}`;
            case "outline":
                return "font-semibold bg-transparent hover:text-slate-50";
        }
    };

    const getIconSize = () => {
        switch (size) {
            case "xs":
                return 12;
            case "sm":
                return 16;
            case "md":
                return 28;
            case "lg":
                return 24;
        }
    };

    return (
        <button
            {...props}
            className={`
                rounded-md transition group-[.buttonGroup]:rounded-none group-[.buttonGroup]:first:rounded-l-md group-[.buttonGroup]:last:rounded-r-md group-[.buttonGroup]:border-0
                disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200 disabled:border-slate-300 disabled:active:scale-100 border
                flex items-center justify-center gap-2 active:scale-95 shrink-0
                ${getColorStyles()}
                ${getSizeStyles()}
                ${getShapeStyles()}
                ${getVariantStyles()}
                ${isFullWidth ? "w-full" : "w-fit"}
            `}
        >
            {Icon && <Icon size={getIconSize()} />}
            {children && <span className="truncate">{children}</span>}
        </button>
    );
};

export default Button;
