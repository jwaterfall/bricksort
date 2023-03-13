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

import Card from "./Card";
import Button from "./Button";
import Typography from "./Typography";

export interface SidebarLinkProps {
    href: string;
    exact?: boolean;
    Icon: IconType;
}

export const SidebarLink: FC<PropsWithChildren<SidebarLinkProps>> = ({ href, exact, Icon, children }) => {
    const pathName = useRouter().pathname;
    const isActive = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

    return (
        <Link
            href={href}
            className={`flex items-center gap-4 py-2 hover:font-medium hover:text-gray-50 ${isActive ? "text-gray-50" : "text-gray-300"}`}
        >
            <Icon className={`w-6 h-6 ${isActive ? "text-red-500" : ""}`} />
            <h4 className="text-sm mt-0.5">{children}</h4>
        </Link>
    );
};

export interface SidebarSectionProps {
    title: string;
}

export const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({ title, children }) => (
    <div>
        <h5 className="text-gray-50 text-sm font-medium uppercase mb-2">{title}</h5>
        {children}
    </div>
);

const Sidebar: FC = () => (
    <aside className="flex flex-col gap-8 w-64 p-8">
        <Link href="/" className="flex items-center gap-4 text-2xl font-medium text-gray-50">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="h-10 w-10" />
            <h2 className="text-2xl font-lobster tracking-wider">Bricksort</h2>
        </Link>
        <nav className="flex flex-1 flex-col gap-8">
            <SidebarSection title="my collection">
                <SidebarLink href="/" exact Icon={MdOutlineSpaceDashboard}>
                    Dashboard
                </SidebarLink>
                <SidebarLink href="/collection/sets" Icon={MdOutlineHandyman}>
                    Incomplete sets
                </SidebarLink>
                <SidebarLink href="/collection/sets/missing-parts" exact Icon={MdOutlineExtension}>
                    Missing Parts
                </SidebarLink>
                <SidebarLink href="/collection/sets/missing-minifigs" exact Icon={MdOutlinePerson}>
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
        <div className="-m-4">
            <Card>
                <Typography>New here?</Typography>
                Start by adding a set to your collection.
                <Button isFullWidth color="primary">
                    Browse
                </Button>
            </Card>
        </div>
    </aside>
);

export default Sidebar;
