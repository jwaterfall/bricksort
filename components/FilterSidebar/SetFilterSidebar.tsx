"use client";

import { FC, useEffect } from "react";

import { Theme } from "../../models/Theme";
import FilterSidebarSection from "./FilterSidebarSection";
import Input from "../Input";
import useSearchParam from "../../hooks/useSearchParam";
import useSearchParamArray from "../../hooks/useSearchParamArray";
import useSearchParamNumber from "../../hooks/useSearchParamNumber";
import Checkbox from "./Checkbox";

interface ThemeFilterProps {
  theme: Theme;
  isChild?: boolean;
  isLastChild?: boolean;
}

interface SetFilterSidebarProps {
  themes: Theme[];
}

const SetFilterSidebar: FC<SetFilterSidebarProps> = ({ themes }) => {
  const [minYear, setMinYear] = useSearchParamNumber("minYear", 1949);
  const [maxYear, setMaxYear] = useSearchParamNumber("maxYear", new Date().getFullYear());
  const [search, setSearch] = useSearchParam("search");
  const [_, setPage] = useSearchParamNumber("page");
  const { values, includesValue, addValues, removeValues } = useSearchParamArray("themes", []);

  useEffect(() => {
    setPage(1);
  }, [search, minYear, maxYear, values]);

  const getChildren = (theme: Theme) => themes.filter((t) => t.parent === theme._id);

  const getChildrenDeep = (theme: Theme): Theme[] => {
    const children = getChildren(theme);
    return children.reduce((acc, child) => [...acc, ...getChildrenDeep(child)], children);
  };

  const ThemeFilter: FC<ThemeFilterProps> = ({ theme, isChild = false, isLastChild = false }) => {
    const isChecked = includesValue(theme._id);
    const children = getChildren(theme);

    const onClick = (theme: Theme) => {
      const children = getChildrenDeep(theme);
      const newValues = [theme._id, ...children.map((theme) => theme._id)];

      const includesTheme = includesValue(theme._id);
      removeValues(...newValues);
      if (!includesTheme) addValues(...newValues);
    };

    return (
      <div className={isChild ? "ml-5 relative" : ""}>
        {!isLastChild && <div className="absolute -left-2.5 -top-0 h-full w-0.5 bg-slate-300" />}
        {isChild && <div className="absolute -left-2.5 -top-4 h-8 w-2.5 border-slate-300 border-l-2 border-b-2 rounded-bl-md" />}

        <Checkbox isChecked={isChecked} onClick={() => onClick(theme)}>
          <span className="truncate shrink">{theme.name}</span>({theme.setCount})
        </Checkbox>

        {children.map((child, index) => (
          <ThemeFilter theme={child} isChild key={child._id} isLastChild={index === children.length - 1} />
        ))}
      </div>
    );
  };

  return (
    <div className="shrink-0 flex flex-col gap-8 bg-slate-50 border-slate-200 border-r w-80 h-full p-8 border-darken-0.1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
      <FilterSidebarSection title="search">
        <Input placeholder="Search by name or id" value={search ?? ""} onChange={(e) => setSearch(e.target.value || undefined)} />
      </FilterSidebarSection>
      <FilterSidebarSection title="year">
        <div className="flex flex-col gap-2">
          <Input label="from" type="number" value={minYear} onChange={(e) => setMinYear(e.target.valueAsNumber)} />
          <Input label="up to" type="number" value={maxYear} onChange={(e) => setMaxYear(e.target.valueAsNumber)} />
        </div>
      </FilterSidebarSection>
      <FilterSidebarSection title="themes">
        {themes
          .filter((theme) => !theme.parent)
          .map((theme) => (
            <ThemeFilter key={theme._id} theme={theme} />
          ))}
      </FilterSidebarSection>
    </div>
  );
};

export default SetFilterSidebar;
