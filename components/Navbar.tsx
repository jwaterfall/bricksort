import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FaBoxOpen, FaCar, FaHome } from "react-icons/fa";

interface NavbarLinkProps {
    href: string;
    Icon: IconType;
    exact?: boolean;
}

const NavbarLink: FC<PropsWithChildren<NavbarLinkProps>> = ({ href, Icon, children, exact = false }) => {
    const pathName = useRouter().pathname;
    const active = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

    return (
        <Link href={href} className={active ? "active text-primary" : ""}>
            <Icon className="text-currentColor w-5 h-5" />
            <span className="font-medium text-sm">{children}</span>
        </Link>
    );
};

const Navbar: FC = () => (
    <div className="btm-nav static">
        <NavbarLink href="/" exact Icon={FaHome}>
            Home
        </NavbarLink>
        <NavbarLink href="/collection" Icon={FaBoxOpen}>
            Collection
        </NavbarLink>
        <NavbarLink href="/browse" Icon={FaCar}>
            Browse
        </NavbarLink>
    </div>
);

export default Navbar;
