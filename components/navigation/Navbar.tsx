import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import {
    MdOutlineSpaceDashboard,
    MdOutlineHandyman,
    MdOutlineExtension,
    MdOutlineSettings,
    MdOutlineDirectionsCar,
    MdOutlinePerson,
    MdOutlineLogout,
} from "react-icons/md";

export interface SidebarLinkProps {
    href: string;
    exact?: boolean;
    Icon?: IconType;
    badge?: string | number;
}

export const SidebarLink: FC<PropsWithChildren<SidebarLinkProps>> = ({ href, exact, Icon, badge, children }) => {
    const pathName = useRouter().pathname;
    const isActive = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

    return (
        <Link href={href} className={`flex align-center gap-2 py-2 transition-colors ${isActive ? "text-slate-50" : "hover:text-slate-300"}`}>
            {Icon && <Icon className={`w-6 h-6 ${isActive ? "text-red-500" : ""}`} />}
            <h4 className="text-sm mt-0.5">{children}</h4>
            {badge && <span className="bg-red-500 text-red-50 text-xs px-2 py-1 h-auto rounded-full ml-auto">{badge}</span>}
        </Link>
    );
};

export interface SidebarSectionProps {
    title: string;
}

export const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({ title, children }) => (
    <div>
        <h5 className="text-slate-200 text-sm font-medium uppercase mb-2">{title}</h5>
        {children}
    </div>
);

const Navbar: FC = () => (
    <div className="bg-slate-900 text-slate-400 w-72 h-full shrink-0">
        <div className="flex items-center gap-4 px-8 h-20 border-b border-slate-800">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <h2 className="text-2xl font-lobster tracking-wider text-slate-50">Bricksort</h2>
        </div>
        <nav className="py-4 px-8 flex flex-col gap-8 grow">
            <SidebarSection title="my collection">
                <SidebarLink href="/" exact Icon={MdOutlineSpaceDashboard}>
                    Dashboard
                </SidebarLink>
                <SidebarLink href="/collection/sets" Icon={MdOutlineHandyman} badge="32">
                    Incomplete sets
                </SidebarLink>
                <SidebarLink href="/collection/sets/missing-parts" exact Icon={MdOutlineExtension} badge="4523">
                    Missing Parts
                </SidebarLink>
                <SidebarLink href="/collection/sets/missing-minifigs" exact Icon={MdOutlinePerson} badge="2">
                    Missing Minifigs
                </SidebarLink>
            </SidebarSection>
            <SidebarSection title="browse">
                <SidebarLink href="/sets" Icon={MdOutlineDirectionsCar}>
                    Browse Sets
                </SidebarLink>
            </SidebarSection>
            <SidebarSection title="account">
                <SidebarLink href="/settings" exact Icon={MdOutlineSettings}>
                    Settings
                </SidebarLink>
                <SidebarLink href="/api/auth/logout" Icon={MdOutlineLogout}>
                    Sign Out
                </SidebarLink>
            </SidebarSection>
        </nav>
    </div>
);

export default Navbar;
