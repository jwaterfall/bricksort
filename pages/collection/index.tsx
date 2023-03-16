import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import useCollectionInventories from "../../queries/useCollectionInventories";
import CollectionInventoryCard from "../../components/Card/CollectionInventoryCard";
import CardDisplay from "../../components/CardDisplay";

const CollectionPage: NextPage = () => {
    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });
    const { data, isLoading: isSetsLoading } = useCollectionInventories(page, 20);

    if (isSetsLoading || !data) return null;

    return (
        <CardDisplay
            page={page}
            setPage={setPage}
            pageCount={data.pageCount}
            emptyTitle="No sets found"
            emptySubtitle="Go to the Browse page to add sets to your collection"
        >
            {data.collectionInventories.map((collectionInventory) => (
                <CollectionInventoryCard key={collectionInventory.id} collectionInventory={collectionInventory} />
            ))}
        </CardDisplay>
    );
};

export default withPageAuthRequired(CollectionPage);
