import { FC } from "react";
import { FaFilter } from "react-icons/fa";

import useThemes from "../queries/useThemes";

interface SetFilterDropdownProps {
    search: string;
    setSearch: (search: string) => Promise<boolean>;
    minYear: number;
    setMinYear: (minYear: number) => Promise<boolean>;
    maxYear: number;
    setMaxYear: (maxYear: number) => Promise<boolean>;
    themeIds: string[];
    setThemeIds: (themeIds: string[]) => Promise<boolean>;
    setPage: (page: number) => Promise<boolean>;
}

const SetFilterDropdown: FC<SetFilterDropdownProps> = ({
    search,
    setSearch,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    themeIds,
    setThemeIds,
    setPage,
}) => {
    const { data: themes } = useThemes();

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary gap-2">
                <FaFilter className="h-5 w-5" />
                filters
            </label>
            <ul tabIndex={0} className="dropdown-content p-4 mt-2 shadow-xl bg-base-100 rounded-box font-medium">
                <li>
                    <div className="form-control w-full max-w-xs">
                        <label className="label w-full">
                            <span className="label-text">Search</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Set ID or name..."
                            className="input w-full max-w-xs bg-base-300"
                            value={search}
                            onChange={async (e) => {
                                await setSearch(e.target.value);
                                await setPage(1);
                            }}
                        />
                    </div>
                </li>
                <li>
                    <div className="form-control w-full max-w-xs">
                        <label className="label w-full">
                            <span className="label-text">Year</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                className="input w-full max-w-xs bg-base-300"
                                value={minYear}
                                onChange={async (e) => {
                                    await setMinYear(parseInt(e.target.value));
                                    await setPage(1);
                                }}
                            />
                            <h4>to</h4>
                            <input
                                type="number"
                                className="input w-full max-w-xs bg-base-300"
                                value={maxYear}
                                onChange={async (e) => {
                                    await setMaxYear(parseInt(e.target.value));
                                    await setPage(1);
                                }}
                            />
                        </div>
                    </div>
                </li>
                {themes && (
                    <li>
                        <div className="form-control w-full max-w-xs">
                            <label className="label w-full">
                                <span className="label-text">Theme</span>
                            </label>
                            <div className="flex flex-col max-h-52 overflow-y-auto p-4 bg-base-300 rounded-sm">
                                {themes
                                    .filter((theme) => !theme.parent)
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((theme) => (
                                        <label key={theme._id} className="label cursor-pointer gap-2 justify-start">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={themeIds.includes(theme._id)}
                                                onChange={async (e) => {
                                                    if (e.target.checked) {
                                                        await setThemeIds([...themeIds, theme._id]);
                                                    } else {
                                                        await setThemeIds(themeIds.filter((id) => id !== theme._id));
                                                    }
                                                    await setPage(1);
                                                }}
                                            />
                                            <span className="label-text truncate">{theme.name}</span>
                                        </label>
                                    ))}
                            </div>
                        </div>
                    </li>
                )}
                <button
                    className="btn btn-primary mt-2 w-full"
                    onClick={async () => {
                        await setSearch("");
                        await setThemeIds([]);
                        await setMinYear(1950);
                        await setMaxYear(new Date().getFullYear());
                        await setPage(1);
                    }}
                >
                    clear filters
                </button>
            </ul>
        </div>
    );
};

export default SetFilterDropdown;
