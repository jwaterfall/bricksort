import { FC, PropsWithChildren } from "react";

const ButtonGroup: FC<PropsWithChildren<{}>> = ({ children }) => (
    <div className={`flex group buttonGroup overflow-hidden border-slate-300 border rounded-md bg-slate-300 gap-px w-fit`}>{children}</div>
);

export default ButtonGroup;
