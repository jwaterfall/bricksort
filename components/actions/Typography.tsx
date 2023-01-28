import { FC, PropsWithChildren } from "react";

export type TypographySize = "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export type TypographyWeight = "light" | "regular" | "medium" | "semibold" | "bold";
export type TypographyColor = "primary" | "secondary";
export type TypographyAlign = "left" | "center" | "right";

interface TypographyProps {
    size?: TypographySize;
    weight?: TypographyWeight;
    color?: TypographyColor;
    align?: TypographyAlign;
    truncate?: boolean;
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
    size = "md",
    weight = "regular",
    color = "primary",
    align = "left",
    truncate = false,
    children,
}) => {
    const getWeightStyles = () => {
        switch (weight) {
            case "light":
                return "font-light";
            case "regular":
                return "font-normal";
            case "medium":
                return "font-medium";
            case "semibold":
                return "font-semibold";
            case "bold":
                return "font-bold";
        }
    };

    const getColorStyles = () => {
        switch (color) {
            case "primary":
                return "text-slate-900";
            case "secondary":
                return "text-slate-500";
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "5xl":
                return "text-5xl";
            case "4xl":
                return "text-4xl";
            case "3xl":
                return "text-3xl";
            case "2xl":
                return "text-2xl";
            case "xl":
                return "text-xl";
            case "lg":
                return "text-lg";
            case "md":
                return "text-base";
            case "sm":
                return "text-sm";
            case "xs":
                return "text-xs";
        }
    };

    const getAlignStyles = () => {
        switch (align) {
            case "left":
                return "text-left";
            case "center":
                return "text-center";
            case "right":
                return "text-right";
        }
    };

    return (
        <div className={`${getSizeStyles()} ${getWeightStyles()} ${getColorStyles()} ${getAlignStyles()} ${truncate ? "truncate" : ""}`}>
            {children}
        </div>
    );
};

export default Typography;
