import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "md" | "lg";
  fullWidth?: boolean;
  Icon?: IconType;
}

const Button: FC<ButtonProps> = ({ size, fullWidth = false, Icon, children, ...props }) => (
  <button
    className={`
    rounded-md text-white font-medium bg-red-500 hover:bg-red-400 transition
    disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200
    flex items-center justify-center gap-2
    ${fullWidth ? "w-full" : ""} 
    ${size === "sm" ? "text-sm py-2 px-3" : ""}
    ${size === "md" ? "text-sm py-3 px-4" : ""}
    ${size === "lg" ? "text-base py-4 px-5" : ""}
  `}
    {...props}
  >
    {Icon && <Icon size={size === "sm" ? 16 : size === "md" ? 20 : 24} />}
    <span className="truncate">{children}</span>
  </button>
);

export default Button;
