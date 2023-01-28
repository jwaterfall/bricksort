import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import Breadcrumb from "./Breadcrumb";

const Topbar: FC = () => {
    const { user, isLoading } = useUser();

    if (isLoading || !user) return null;

    return (
        <div className="bg-white shadow-sm  w-full h-20 px-8 flex items-center justify-between border-b border-slate-300 shrink-0">
            <Breadcrumb />
            <div className="flex items-center gap-4">
                {user.picture && <img src={user.picture} alt="avatar" className="w-10 h-10 rounded-full" />}
                <h4 className="text-sm font-medium">{user.name}</h4>
            </div>
        </div>
    );
};

export default Topbar;
