import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";
import { MdOutlineFilterAlt } from "react-icons/md";

import useSets from "../../queries/useSets";
import Topbar from "../../components/Topbar";
import SetCard from "../../components/SetCard";
import Pagination from "../../components/Pagination";
import useThemes from "../../queries/useThemes";
import useDebounce from "../../hooks/useDebounce";

const SetsPage: NextPage = () => {
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });
    const [themeIds, setThemeIds] = useQueryState<string[]>("themes", { ...queryTypes.array(queryTypes.string), defaultValue: [], history: "push" });
    const [search, setSearch] = useQueryState("search", { ...queryTypes.string, defaultValue: "", history: "push" });
    const [minYear, setMinYear] = useQueryState("minYear", { ...queryTypes.integer, defaultValue: 1950, history: "push" });
    const [maxYear, setMaxYear] = useQueryState("maxYear", { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: "push" });
    const debouncedSearch = useDebounce(search);

    const { data: sets, isLoading: isSetsLoading } = useSets(page, 20, themeIds, debouncedSearch, minYear, maxYear);
    const { data: themes, isLoading: isThemesLoading } = useThemes();

    if (isSetsLoading || !sets || isThemesLoading || !themes) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Pagination page={page} setPage={setPage} pageCount={sets.totalPageCount} />
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn btn-primary gap-2">
                        <MdOutlineFilterAlt className="h-6 w-6" />
                        Filters
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box">
                        <li>
                            <div className="form-control w-full max-w-xs">
                                <label className="label w-full">
                                    <span className="label-text">Search</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Set ID or name..."
                                    className="input input-bordered w-full max-w-xs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                        className="input input-bordered w-full max-w-xs"
                                        value={minYear}
                                        onChange={(e) => setMinYear(parseInt(e.target.value))}
                                    />
                                    <h4>to</h4>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full max-w-xs"
                                        value={maxYear}
                                        onChange={(e) => setMaxYear(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="form-control w-full max-w-xs">
                                <label className="label w-full">
                                    <span className="label-text">Theme</span>
                                </label>
                                <div className="flex flex-col max-h-52 overflow-y-auto border border-base-content/20 rounded-lg p-4">
                                    {themes
                                        .filter((theme) => !theme.parent)
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((theme) => (
                                            <label key={theme._id} className="label cursor-pointer gap-2 justify-start">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-primary"
                                                    checked={themeIds.includes(theme._id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setThemeIds([...themeIds, theme._id]);
                                                        } else {
                                                            setThemeIds(themeIds.filter((id) => id !== theme._id));
                                                        }
                                                    }}
                                                />
                                                <span className="label-text truncate">{theme.name}</span>
                                            </label>
                                        ))}
                                </div>
                            </div>
                        </li>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={async () => {
                                await setSearch("");
                                await setThemeIds([]);
                                await setMinYear(1950);
                                await setMaxYear(new Date().getFullYear());
                                await setPage(1);
                            }}
                        >
                            Clear filters
                        </button>
                    </ul>
                </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                {sets.sets.map((set) => (
                    <SetCard key={set.id} set={set} />
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageCount={sets.totalPageCount} />
        </div>
    );
};

export default withPageAuthRequired(SetsPage);
