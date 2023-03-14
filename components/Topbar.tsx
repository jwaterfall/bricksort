import { FC } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Topbar: FC = () => {
    const { user } = useUser();

    return (
        <div className="navbar bg-base-100 px-4 shadow-xl justify-between">
            <Link className="flex gap-4 text-2xl font-lobster" href="/">
                <Image src="/logo.png" alt="Logo" className="w-10 h-10" width={40} height={40} />
                Bricksort
            </Link>
            <div className="flex-none">
                {user?.picture && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.picture} referrerPolicy="no-referrer" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="/api/auth/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
