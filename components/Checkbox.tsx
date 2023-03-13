import { FC, InputHTMLAttributes } from "react";
import { MdOutlineCheck, MdOutlineRemove } from "react-icons/md";

export type CheckboxColor = "primary" | "info" | "success" | "warning" | "error";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    intermediate?: boolean;
    color?: CheckboxColor;
    onClick?: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, intermediate, color = "primary", onClick }) => {
    const getColorStyles = () => {
        if (!checked) return "bg-slate-200 border-slate-300";

        switch (color) {
            case "primary":
                return "bg-red-500 text-slate-50 border-red-500";
            case "info":
                return "bg-blue-500 text-slate-50 border-blue-500";
            case "success":
                return "bg-green-500 text-slate-50 border-green-500";
            case "warning":
                return " bg-orange-400 text-slate-50 border-orange-400";
            case "error":
                return "bg-red-500 text-slate-50 border-red-500";
        }
    };

    return (
        <div className={`flex items-center justify-center w-6 h-6 rounded-xl border ${getColorStyles()}`} onClick={onClick}>
            {checked ? <MdOutlineCheck className="w-4 h-4" /> : intermediate ? <MdOutlineRemove className="w-4 h-4" /> : null}
        </div>
    );
};

export default Checkbox;
