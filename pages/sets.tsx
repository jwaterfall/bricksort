import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import SetFilterSidebar from "../components/SetFilterSidebar";
import Pagination from "../components/navigation/Pagination";
import SetList from "../components/display/SetList";
import useSets from "../queries/useSets";
import ButtonGroup from "../components/layout/ButtonGroup";
import Button from "../components/actions/Button";
import Typography from "../components/actions/Typography";

const SetsPage: NextPage = () => {
    const limitOptions = [10, 25, 50, 100];

    const [limit, setLimit] = useQueryState("limit", { ...queryTypes.integer, defaultValue: limitOptions[0], history: "push" });
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });
    const [themeIds, setThemeIds] = useQueryState<string[]>("themes", { ...queryTypes.array(queryTypes.string), defaultValue: [], history: "push" });
    const [search, setSearch] = useQueryState("search", { ...queryTypes.string, defaultValue: "", history: "push" });
    const [minYear, setMinYear] = useQueryState("minYear", { ...queryTypes.integer, defaultValue: 1950, history: "push" });
    const [maxYear, setMaxYear] = useQueryState("maxYear", { ...queryTypes.integer, defaultValue: new Date().getFullYear(), history: "push" });

    const { data, isLoading } = useSets(page, limit, themeIds, search, minYear, maxYear);

    if (isLoading || !data) return null;

    return (
        <div className="h-full flex">
            <SetFilterSidebar
                themeIds={themeIds}
                setThemeIds={setThemeIds}
                search={search}
                setSearch={setSearch}
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                setPage={setPage}
            />
            <div className="grow p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <Pagination page={page} size="sm" onChange={setPage} pageCount={data.totalPageCount} />
                        <ButtonGroup>
                            {limitOptions.map((option, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    shape="square"
                                    onClick={async () => {
                                        await setLimit(option);
                                        await setPage(1);
                                    }}
                                    color={option === limit ? "primary" : "default"}
                                >
                                    {option}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                    <SetList sets={data.sets} />
                    <Pagination page={page} size="sm" onChange={setPage} pageCount={data.totalPageCount} />
                </div>
            </div>
        </div>
    );
};

export default withPageAuthRequired(SetsPage);
