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
        <div className="flex flex-col gap-4">
            <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
            <CardContainer>
                {data.collectionInventories.map((collectionInventory) => (
                    <SetCard key={collectionInventory.id} collectionInventory={collectionInventory} />
                ))}
            </CardContainer>
            <Pagination page={page} setPage={setPage} pageCount={data.totalPageCount} />
        </div>
    );
};

export default withPageAuthRequired(CollectionPage);
