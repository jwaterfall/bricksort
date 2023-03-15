import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import useCollectionInventories from "../queries/useCollectionInventories";
import SetCard from "../components/SetCard";
import Pagination from "../components/Pagination";
import CardContainer from "../components/CardContainer";

const CollectionPage: NextPage = () => {
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });

    const { data, isLoading: isSetsLoading } = useCollectionInventories(page, 20);

    if (isSetsLoading || !data) return null;

    return (
        <div className="flex flex-col gap-4 min-h-full">
            <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
            {data.collectionInventories.length ? (
                <CardContainer>
                    {data.collectionInventories.map((collectionInventory) => (
                        <SetCard key={collectionInventory.id} collectionInventory={collectionInventory} />
                    ))}
                </CardContainer>
            ) : (
                <div className="flex-1 flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-2xl font-bold">No sets found</h1>
                    <h3 className="font-medium text-center">Go to the browse page to add sets to your collection</h3>
                </div>
            )}
            <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
        </div>
    );
};

export default withPageAuthRequired(CollectionPage);
