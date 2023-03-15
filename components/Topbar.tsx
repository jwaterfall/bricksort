import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaBell, FaSignOutAlt } from "react-icons/fa";

import { useAlerts } from "./AlertProvider";

const Topbar: FC = () => {
    const { user } = useUser();
    const { enabled, setEnabled } = useAlerts();

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start"></div>
            <div className="navbar-center">
                <Link className="text-3xl font-lobster" href="/">
                    Bricksort
                </Link>
            </div>
            <div className="navbar-end">
                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user.picture && <img src={user.picture} referrerPolicy="no-referrer" alt="User avatar" />}
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 mt-2 shadow-xl bg-base-100 rounded-box w-52 font-medium">
                            <li>
                                <button onClick={() => setEnabled((enabled) => !enabled)}>
                                    <FaBell className="w-5 h-5" />
                                    Alerts: {enabled ? "Enabled" : "Disabled"}
                                </button>
                            </li>
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="/api/auth/logout">
                                    <FaSignOutAlt className="w-5 h-5" />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
