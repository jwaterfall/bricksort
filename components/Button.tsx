import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

export type ButtonColor = "default" | "primary" | "info" | "success" | "warning" | "error";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonShape = "default" | "square";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    size?: ButtonSize;
    shape?: ButtonShape;
    Icon?: IconType;
    isFullWidth?: boolean;
    ping?: boolean;
}

const Button: FC<ButtonProps> = ({
    color = "default",
    size = "md",
    shape = "default",
    Icon,
    isFullWidth = false,
    ping = false,
    children,
    ...props
}) => {
    const getColorStyles = () => {
        switch (color) {
            case "default":
                return "bg-gray-900";
            case "primary":
                return "bg-red-500";
            case "info":
                return "bg-blue-500";
            case "success":
                return "bg-green-500";
            case "warning":
                return "bg-orange-400";
            case "error":
                return "bg-red-500";
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "sm":
                return "text-sm px-3 h-8";
            case "md":
                return "text-sm px-4 h-12";
            case "lg":
                return "text-lg px-6 h-14";
        }
    };

    const getShapeStyles = () => {
        switch (shape) {
            case "default":
                return "";
            case "square":
                return "px-0 aspect-square";
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
                relative text-gray-50 transition disabled:bg-gray-700 disabled:text-gray-500 disabled:hover:bg-gray-700 disabled:active:scale-100
                flex items-center justify-center gap-2 active:scale-95 shrink-0 cursor-pointer rounded-xl border border-gray-700
                ${getColorStyles()}
                ${getSizeStyles()}
                ${getShapeStyles()}
                ${isFullWidth ? "w-full" : "w-fit"}
            `}
        >
            {Icon && <Icon size={getIconSize()} />}
            {children && <span className="truncate">{children}</span>}
            {ping && (
                <div className="absolute top-3 right-3 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
                </div>
            )}
        </button>
    );
};

export default Button;
