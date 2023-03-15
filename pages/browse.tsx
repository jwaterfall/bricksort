import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import useSets from "../queries/useSets";
import SetCard from "../components/SetCard";
import Pagination from "../components/Pagination";
import useDebounce from "../hooks/useDebounce";
import SetFilterDropdown from "../components/SetFilterDropdown";
import CardContainer from "../components/CardContainer";

const BrowsePage: NextPage = () => {
    const [search, setSearch] = useQueryState("search", { ...queryTypes.string, defaultValue: "", history: "push" });
    const [minYear, setMinYear] = useQueryState("minYear", { ...queryTypes.integer, defaultValue: 1950, history: "push" });
    const [maxYear, setMaxYear] = useQueryState("maxYear", { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: "push" });
    const [themeIds, setThemeIds] = useQueryState<string[]>("themes", { ...queryTypes.array(queryTypes.string), defaultValue: [], history: "push" });
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });

    const { data, isLoading: isSetsLoading } = useSets(page, 20, themeIds, useDebounce(search), minYear, maxYear);

    if (isSetsLoading || !data) return null;

    return (
        <div className="flex flex-col gap-4 min-h-full">
            <div className="flex justify-between">
                <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
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
            {data.sets.length ? (
                <CardContainer>
                    {data.sets.map((set) => (
                        <SetCard key={set.id} set={set} />
                    ))}
                </CardContainer>
            ) : (
                <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-2xl font-bold">No sets found</h1>
                    <h3 className="font-medium text-center">Try changing your filters</h3>
                </div>
            )}
            <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
        </div>
    );
};

export default withPageAuthRequired(BrowsePage);
