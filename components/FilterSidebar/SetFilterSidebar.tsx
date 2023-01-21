"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";

import { Theme } from "../../models/Theme";
import FilterSidebarSection from "./FilterSidebarSection";
import SearchParamLink from "../SearchParamLink";
import Checkbox from "./Checkbox";
import FilterInput from "./FilterInput";

interface ThemeFilterProps {
    theme: Theme;
    isChild?: boolean;
    isLastChild?: boolean;
}

interface SetFilterSidebarProps {
    themes: Theme[];
}

const SetFilterSidebar: FC<SetFilterSidebarProps> = ({ themes }) => {
    const searchParams = useSearchParams();

    const themesSearchParam = searchParams.get("themes");
    const themeIds = themesSearchParam ? themesSearchParam.split(",") : [];

    const getChildren = (theme: Theme) => themes.filter((t) => t.parent === theme._id);

    const getChildrenDeep = (theme: Theme): Theme[] => {
        const children = getChildren(theme);
        return children.reduce((acc, child) => [...acc, ...getChildrenDeep(child)], children);
    };

    const ThemeFilter: FC<ThemeFilterProps> = ({ theme, isChild = false, isLastChild = false }) => {
        const isChecked = themeIds.includes(theme._id);
        const children = getChildren(theme);

        const getThemeIds = () => {
            if (isChecked) return themeIds.filter((id) => id !== theme._id).join(",");

            const children = getChildrenDeep(theme);
            const newValues = [theme._id, ...children.map((theme) => theme._id)];
            const filteredValues = themeIds.filter((id) => !newValues.includes(id));

            return [...filteredValues, ...newValues].join(",");
        };

        return (
            <div className={isChild ? "ml-5 relative" : ""}>
                {!isLastChild && <div className="absolute -left-2.5 -top-0 h-full w-0.5 bg-slate-300" />}
                {isChild && <div className="absolute -left-2.5 -top-4 h-8 w-2.5 border-slate-300 border-l-2 border-b-2 rounded-bl-md" />}

                <SearchParamLink values={{ themes: getThemeIds() || undefined, page: 1 }}>
                    <Checkbox isChecked={isChecked}>
                        <span className="truncate shrink">{theme.name}</span>({theme.setCount})
                    </Checkbox>
                </SearchParamLink>

                {children.map((child, index) => (
                    <ThemeFilter theme={child} isChild key={child._id} isLastChild={index === children.length - 1} />
                ))}
            </div>
        );
    };

    return (
        <div className="shrink-0 flex flex-col gap-8 bg-slate-50 border-slate-300 border-r w-80 h-full p-8 border-darken-0.1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
            <FilterSidebarSection title="search">
                <FilterInput searchParamName="search" placeholder="Set name or number..." />
            </FilterSidebarSection>
            <FilterSidebarSection title="year">
                <div className="flex flex-col gap-2">
                    <FilterInput searchParamName="minYear" label="from" type="number" />
                    <FilterInput searchParamName="maxYear" label="up to" type="number" />
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
