import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdOutlineNotifications, MdOutlineExpandMore, MdSearch } from "react-icons/md";
import Button from "./Button";
import Input from "./Input";

export interface TopbarProps {
    title: string;
}

const Topbar: FC<TopbarProps> = ({ title }) => {
    const { user, isLoading } = useUser();

    if (isLoading || !user) return null;

    return (
        <nav className="flex items-center justify-between gap-8">
            <h1 className="text-3xl font-semibold text-gray-50 capitalize">{title}</h1>
            <div className="flex items-center gap-4">
                <Input placeholder="Search..." Icon={MdSearch} />
                <Button shape="square" color="default" Icon={MdOutlineNotifications} ping />
                <button className="flex h-12 items-center justify-center rounded-xl bg-gray-900 px-2 text-gray-400 hover:text-gray-50 border border-gray-700">
                    {user.picture && (
                        <img src={user.picture} alt="profile picture" className="h-8 w-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    )}
                    <span className="pl-2 text-sm">{user.name}</span>
                    <MdOutlineExpandMore className="h-6 w-6 stroke-current" />
                </button>
            </div>
        </nav>
    );
};

export default Topbar;
