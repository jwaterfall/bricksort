import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { MdOutlineHandyman, MdOutlineSettings, MdOutlineDirectionsCar } from "react-icons/md";

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
            <h4 className="text-sm mt-0.5">{children}</h4>
        </Link>
    );
};

const Navbar: FC = () => (
    <div className="btm-nav static">
        <NavbarLink href="/" exact Icon={MdOutlineHandyman} />
        <NavbarLink href="/browse/sets" Icon={MdOutlineDirectionsCar} />
        <NavbarLink href="/settings" Icon={MdOutlineSettings} />
    </div>
);

export default Navbar;
