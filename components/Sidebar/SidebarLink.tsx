import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";

export interface SidebarLinkProps {
  href: string;
  exact?: boolean;
  Icon?: IconType;
  badge?: string | number;
}

const SidebarLink: FC<PropsWithChildren<SidebarLinkProps>> = ({ href, exact, Icon, badge, children }) => {
  const pathName = usePathname();
  const isActive = pathName ? (exact ? pathName === href : pathName.startsWith(href)) : false;

  return (
    <Link href={href} className={`flex align-center gap-2 py-2 transition-colors ${isActive ? "text-slate-50" : "hover:text-slate-300"}`}>
      {Icon && <Icon className={`w-6 h-6 ${isActive ? "text-red-500" : ""}`} />}
      <h4 className="text-sm mt-0.5">{children}</h4>
      {badge && <span className="bg-red-500 text-red-50 text-xs px-2 py-1 h-auto rounded-full ml-auto">{badge}</span>}
    </Link>
  );
};

export default SidebarLink;
