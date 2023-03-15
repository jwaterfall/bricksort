import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import useSets from "../../queries/useSets";
import SetCard from "../../components/SetCard";
import Pagination from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";
import SetFilterDropdown from "../../components/SetFilterDropdown";

const SetsPage: NextPage = () => {
    const [search, setSearch] = useQueryState("search", { ...queryTypes.string, defaultValue: "", history: "push" });
    const [minYear, setMinYear] = useQueryState("minYear", { ...queryTypes.integer, defaultValue: 1950, history: "push" });
    const [maxYear, setMaxYear] = useQueryState("maxYear", { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: "push" });
    const [themeIds, setThemeIds] = useQueryState<string[]>("themes", { ...queryTypes.array(queryTypes.string), defaultValue: [], history: "push" });
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });

    const { data: sets, isLoading: isSetsLoading } = useSets(page, 60, themeIds, useDebounce(search), minYear, maxYear);

    if (isSetsLoading || !sets) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <Pagination page={page} setPage={setPage} pageCount={sets.totalPageCount} />
                <SetFilterDropdown
                    search={search}
                    setSearch={setSearch}
                    minYear={minYear}
                    setMinYear={setMinYear}
                    maxYear={maxYear}
                    setMaxYear={setMaxYear}
                    themeIds={themeIds}
                    setThemeIds={setThemeIds}
                    setPage={setPage}
                />
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {sets.sets.map((set) => (
                    <SetCard key={set.id} set={set} />
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageCount={sets.totalPageCount} />
        </div>
    );
};

export default withPageAuthRequired(SetsPage);
