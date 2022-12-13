import { FC, PropsWithChildren } from "react";

export interface SidebarSectionProps {
  title: string;
}

const FilterSidebarSection: FC<PropsWithChildren<SidebarSectionProps>> = ({ title, children }) => (
  <div>
    <h5 className="text-slate-900 text-sm font-semibold uppercase mb-2">{title}</h5>
    {children}
  </div>
);

export default FilterSidebarSection;
