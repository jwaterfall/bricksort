import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

export type ButtonColor = "default" | "primary";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonShape = "rectangle" | "square";
export type ButtonVariant = "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    shape = "rectangle",
    variant = "solid",
    Icon,
    isFullWidth = false,
    children,
    ...props
}) => {
    const getColorStyles = () => {
        switch (color) {
            case "default":
                return `bg-slate-100 border-slate-300 ${
                    variant === "outline" ? "text-slate-300 hover:text-slate-900 hover:bg-slate-300" : "text-slate-900"
                }`;
            case "primary":
                return `bg-red-500 border-red-500 ${variant === "outline" ? "text-red-500 hover:text-white hover:bg-red-500" : "text-white"}`;
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
            case "rectangle":
                return "";
            case "square":
                return "px-0 aspect-square";
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case "solid":
                return "font-medium";
            case "outline":
                return "font-semibold bg-none";
        }
    };

    const getIconSize = () => {
        switch (size) {
            case "xs":
                return 12;
            case "sm":
                return 16;
            case "md":
                return 20;
            case "lg":
                return 24;
        }
    };

    return (
        <button
            {...props}
            className={`
                rounded-md transition group-[.buttonGroup]:rounded-none group-[.buttonGroup]:first:rounded-l-md group-[.buttonGroup]:last:rounded-r-md 
                group-[.buttonGroup]:border-none group-[.buttonGroup]:active:scale-100
                disabled:bg-slate-200 disabled:text-slate-500 disabled:hover:bg-slate-200 disabled:border-slate-200 border
                flex items-center justify-center gap-2 active:scale-95 shrink-0
                ${getColorStyles()}
                ${getSizeStyles()}
                ${getShapeStyles()}
                ${getVariantStyles()}
                ${isFullWidth ? "w-full" : "w-fit"}
            `}
        >
            {Icon && <Icon size={getIconSize()} />}
            <span className="truncate">{children}</span>
        </button>
    );
};

export default Button;
