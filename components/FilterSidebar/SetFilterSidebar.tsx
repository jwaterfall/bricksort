import { FC } from "react";
import { MdFilterAlt } from "react-icons/md";

import { Theme } from "../../models/Theme";
import FilterSidebarSection from "./FilterSidebarSection";
import Checkbox from "./Checkbox";
import useThemes from "../../queries/useThemes";
import Input from "../input/Input";
import Button from "../actions/Button";

interface ThemeFilterProps {
    theme: Theme;
    isChild?: boolean;
    isLastChild?: boolean;
}

interface SetFilterSidebarProps {
    themeIds: string[];
    setThemeIds: (themes: string[]) => Promise<boolean>;
    search: string;
    setSearch: (search: string) => Promise<boolean>;
    minYear: number;
    setMinYear: (minYear: number) => Promise<boolean>;
    maxYear: number;
    setMaxYear: (maxYear: number) => Promise<boolean>;
    setPage: (page: number) => Promise<boolean>;
}

const SetFilterSidebar: FC<SetFilterSidebarProps> = ({
    themeIds,
    setThemeIds,
    search,
    setSearch,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    setPage,
}) => {
    const { data: themes, isLoading } = useThemes();
    const getChildren = (theme: Theme) => themes?.filter((t) => t.parent === theme._id) ?? [];

    const getChildrenDeep = (theme: Theme): Theme[] => {
        const children = getChildren(theme);
        return children.reduce((acc, child) => [...acc, ...getChildrenDeep(child)], children);
    };

    const ThemeFilter: FC<ThemeFilterProps> = ({ theme, isChild = false, isLastChild = false }) => {
        const isChecked = themeIds.includes(theme._id);
        const children = getChildren(theme);

        const getThemeIds = () => {
            if (isChecked) return themeIds.filter((id) => id !== theme._id);

            const children = getChildrenDeep(theme);
            const newValues = [theme._id, ...children.map((theme) => theme._id)];
            const filteredValues = themeIds.filter((id) => !newValues.includes(id));

            return [...filteredValues, ...newValues];
        };

        return (
            <div className={isChild ? "ml-5 relative" : ""}>
                {!isLastChild && <div className="absolute -left-2.5 -top-0 h-full w-0.5 bg-slate-300" />}
                {isChild && <div className="absolute -left-2.5 -top-4 h-8 w-2.5 border-slate-300 border-l-2 border-b-2 rounded-bl-md" />}

                <Checkbox
                    isChecked={isChecked}
                    onClick={async () => {
                        await setThemeIds(getThemeIds());
                        await setPage(1);
                    }}
                >
                    <span className="truncate shrink">{theme.name}</span>({theme.setCount})
                </Checkbox>

                {children.map((child, index) => (
                    <ThemeFilter theme={child} isChild key={child._id} isLastChild={index === children.length - 1} />
                ))}
            </div>
        );
    };

    return (
        <div className="shrink-0 flex flex-col gap-8 bg-slate-50 border-slate-300 border-r w-80 h-full py-4 px-8 border-darken-0.1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
            <Button
                size="sm"
                Icon={MdFilterAlt}
                onClick={async () => {
                    await setThemeIds([]);
                    await setSearch("");
                    await setMinYear(1950);
                    await setMaxYear(new Date().getFullYear());
                    await setPage(1);
                }}
            >
                Reset Filters
            </Button>
            <FilterSidebarSection title="search">
                <Input
                    placeholder="Set name or number..."
                    value={search ?? undefined}
                    onChange={async (e) => {
                        await setSearch(e.target.value ?? "");
                        await setPage(1);
                    }}
                />
            </FilterSidebarSection>
            <FilterSidebarSection title="year">
                <div className="flex flex-col gap-2">
                    <Input
                        label="from"
                        type="number"
                        value={minYear ?? undefined}
                        onChange={async (e) => {
                            await setMinYear(e.target.value ? parseInt(e.target.value) : 0);
                            await setPage(1);
                        }}
                    />
                    <Input
                        label="to"
                        type="number"
                        value={maxYear ?? undefined}
                        onChange={async (e) => {
                            await setMaxYear(e.target.value ? parseInt(e.target.value) : 0);
                            await setPage(1);
                        }}
                    />
                </div>
            </FilterSidebarSection>
            <FilterSidebarSection title="themes">
                {themes
                    ?.filter((theme) => !theme.parent)
                    .map((theme) => (
                        <ThemeFilter key={theme._id} theme={theme} />
                    ))}
            </FilterSidebarSection>
        </div>
    );
};

export default SetFilterSidebar;
