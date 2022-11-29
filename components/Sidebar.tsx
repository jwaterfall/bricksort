"use client";

import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { MdOutlineSpaceDashboard, MdHandyman, MdOutlineExtension, MdOutlineSettings, MdAddCircleOutline } from "react-icons/md";
import Link from "next/link";

interface SidebarSectionProps {
  title: string;
}

const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({ title, children }) => (
  <div>
    <h5 className="text-sm uppercase text-text-dark-secondary mb-2">{title}</h5>
    {children}
  </div>
);

interface SidebarLinkProps {
  href: string;
  exact?: boolean;
  Icon?: IconType;
  badge?: string | number;
}

const SidebarLink: FC<PropsWithChildren<SidebarLinkProps>> = ({ href, exact, Icon, badge, children }) => {
  const pathName = usePathname();
  const isActive = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link
      href={href}
      className={`flex align-center gap-4 py-2 cursor-pointer transition-colors ${
        isActive ? "text-text-dark" : "text-text-dark-secondary hover:text-text-dark"
      }`}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <h4 className="text-sm mt-0.5">{children}</h4>
      {badge && <span className="bg-primary text-text-dark text-xs px-2 py-1 h-auto rounded-full ml-auto">{badge}</span>}
    </Link>
  );
};

const Sidebar: FC = () => (
  <div className="bg-background-dark w-72 h-full flex flex-col border-r border-lighten-0.025">
    <div className="flex items-center gap-4 px-8 h-20 border-b border-lighten-0.025">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h2 className="text-2xl text-text-dark font-lobster tracking-wider">Bricksort</h2>
    </div>
    <nav className="p-8 flex flex-col gap-8 grow">
      <SidebarSection title="general">
        <SidebarLink href="/" exact Icon={MdOutlineSpaceDashboard}>
          Dashboard
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="my collection">
        <SidebarLink href="/sets" Icon={MdHandyman} badge="32">
          My Sets
        </SidebarLink>
        <SidebarLink href="/parts" exact Icon={MdOutlineExtension} badge="4523">
          My Parts
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="account">
        <SidebarLink href="/settings" exact Icon={MdOutlineSettings}>
          Settings
        </SidebarLink>
      </SidebarSection>
    </nav>
  </div>
);

export default Sidebar;
