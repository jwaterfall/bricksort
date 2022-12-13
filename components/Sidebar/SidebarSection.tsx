import { FC, PropsWithChildren } from "react";

export interface SidebarSectionProps {
  title: string;
}

const SidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({ title, children }) => (
  <div>
    <h5 className="text-slate-200 text-sm font-medium uppercase mb-2">{title}</h5>
    {children}
  </div>
);

export default SidebarSection;
