import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import Pagination from "../components/Pagination";
import useSets from "../queries/useSets";
import Button from "../components/Button";
import Topbar from "../components/Topbar";
import SetCard from "../components/Card/SetCard";

const SetsPage: NextPage = () => {
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });
    const [themeIds, setThemeIds] = useQueryState<string[]>("themes", { ...queryTypes.array(queryTypes.string), defaultValue: [], history: "push" });
    const [search, setSearch] = useQueryState("search", { ...queryTypes.string, defaultValue: "", history: "push" });
    const [minYear, setMinYear] = useQueryState("minYear", { ...queryTypes.integer, defaultValue: 1950, history: "push" });
    const [maxYear, setMaxYear] = useQueryState("maxYear", { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: "push" });

    const { data, isLoading } = useSets(page, 48, themeIds, search, minYear, maxYear);

    if (isLoading || !data) return null;

    return (
        <>
            <Topbar title="browse sets" />
            <div className="h-full flex">
                {/* <SetFilterSidebar
                themeIds={themeIds}
                setThemeIds={setThemeIds}
                search={search}
                setSearch={setSearch}
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                setPage={setPage}
            /> */}

                <div className="flex flex-col gap-4">
                    <Pagination page={page} onChange={setPage} pageCount={data.totalPageCount} />
                    <div className="grid grid-cols-6 gap-4">
                        {data.sets.map((set) => (
                            <SetCard key={set.id} set={set} />
                        ))}
                    </div>
                    <Pagination page={page} onChange={setPage} pageCount={data.totalPageCount} />
                </div>
            </div>
        </>
    );
};

export default withPageAuthRequired(SetsPage);
