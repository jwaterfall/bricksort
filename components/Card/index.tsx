import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren<{}>> = ({ children }) => (
    <div className="rounded-xl bg-gray-900 p-6 text-sm text-gray-400 flex flex-col gap-4 overflow-hidden border border-gray-700 transition-transform hover:scale-105">
        {children}
    </div>
);

export default Card;
