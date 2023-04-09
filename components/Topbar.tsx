import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { FaBoxOpen, FaCar, FaHome, FaBell, FaSignOutAlt, FaCogs, FaBellSlash } from 'react-icons/fa';

import { useAlerts } from './AlertProvider';
import Dropdown, { DropdownContent, DropdownToggle, useDropdown } from './Dropdown';
import Image from 'next/image';

interface NavbarLinkProps {
    Icon: IconType;
    href: string;
    exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, Icon, children, exact = false }) => {
    const pathName = useRouter().pathname;
    const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

    return (
        <Link
            href={href}
            className="flex items-center gap-2 p-3 lg:px-4 text-sm rounded-lg whitespace-nowrap hover:bg-slate-800 transition-colors duration-75"
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-red-500' : ''}`} />
            <span className="hidden sm:block">{children}</span>
        </Link>
    );
};

const Topbar: FC = () => {
    const { enabled, setEnabled } = useAlerts();

    const SettingsDropdownToggle: FC = () => {
        const { open } = useDropdown();

        return (
            <div className={`flex items-center gap-2 p-3 text-sm rounded-lg whitespace-nowrap ${open ? 'bg-red-500' : 'hover:bg-slate-800'}`}>
                <FaCogs className="w-5 h-5 flex-shrink-0" />
            </div>
        );
    };

    return (
        <div className="bg-slate-900 text-slate-50">
            <div className="py-2 px-4 max-w-7xl mx-auto flex items-center">
                <div className="basis-1/2">
                    <Link className="flex items-center gap-2 text-2xl font-lobster" href="/">
                        <Image src="/logo.png" alt="logo" width={36} height={36} className="hidden sm:block" />
                        <span>Bricksort</span>
                    </Link>
                </div>
                <div className="flex-1 hidden lg:flex justify-center"></div>
                <div className="basis-1/2 flex justify-end gap-2">
                    <NavbarLink href="/" exact Icon={FaHome}>
                        Home
                    </NavbarLink>
                    <NavbarLink href="/collection" Icon={FaBoxOpen}>
                        Collection
                    </NavbarLink>
                    <NavbarLink href="/browse" Icon={FaCar}>
                        Browse
                    </NavbarLink>
                    <Dropdown>
                        <DropdownToggle>
                            <SettingsDropdownToggle />
                        </DropdownToggle>
                        <DropdownContent align="right">
                            <div className="bg-slate-800 rounded-b-lg p-2 mt-2 w-52 flex flex-col">
                                <button
                                    className="flex items-center gap-2 p-2 px-4 text-sm rounded-lg whitespace-nowrap hover:bg-slate-700"
                                    onClick={() => setEnabled((enabled) => !enabled)}
                                >
                                    {enabled ? (
                                        <FaBell className="w-4 h-4 flex-shrink-0" />
                                    ) : (
                                        <FaBellSlash className="w-4 h-4 flex-shrink-0 text-slate-400" />
                                    )}
                                    {enabled ? 'Disable Alerts' : 'Enable Alerts'}
                                </button>
                                {/* eslint-disable-next-line */}
                                <a
                                    className="flex items-center gap-2 py-2 px-4 text-sm rounded-lg whitespace-nowrap hover:bg-slate-700"
                                    href="/api/auth/logout"
                                >
                                    <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
                                    Logout
                                </a>
                            </div>
                        </DropdownContent>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
