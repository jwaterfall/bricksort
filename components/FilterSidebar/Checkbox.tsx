"use client";

import { FC, PropsWithChildren } from "react";
import { MdOutlineCheck, MdOutlineRemove } from "react-icons/md";

interface CheckboxProps {
    isChecked: boolean;
    isIntermediate?: boolean;
    onClick?: () => void;
}

const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({ isChecked, isIntermediate = false, onClick, children }) => {
    return (
        <div
            className={`h-8 flex items-center gap-2 min-w-0 cursor-pointer truncate text-sm font-medium ${
                isChecked ? "text-slate-900" : "text-slate-500"
            }`}
            onClick={onClick}
        >
            <div
                className={`w-5 h-5 flex items-center justify-center rounded-md shrink-0 z-10 ${
                    isChecked || isIntermediate ? "bg-red-500" : "bg-slate-200 border-slate-300 border"
                }`}
            >
                <div className="text-red-50">
                    {isChecked ? <MdOutlineCheck className="w-4 h-4" /> : isIntermediate ? <MdOutlineRemove className="w-4 h-4" /> : null}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Checkbox;
