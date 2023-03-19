import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useQueryState, queryTypes } from "next-usequerystate";

import useCollectionInventoryParts from "../../../queries/useCollectionInventoryParts";
import CardDisplay from "../../../components/CardDisplay";
import CollectionInventoryPartCard from "../../../components/Card/CollectionInventoryPartCard";

const CollectionPage: NextPage = () => {
    const id = useRouter().query.id as string;
    const tab = useRouter().query.tab as string;

    const [page, setPage] = useQueryState("page", { ...queryTypes.integer, defaultValue: 1, history: "push" });
    const { data: partsData, isLoading: isPartsLoading } = useCollectionInventoryParts(id, page, 20);
    const { data: sparesData, isLoading: isSparesLoading } = useCollectionInventoryParts(id, page, 20, true);

    if (isPartsLoading || !partsData || isSparesLoading || !sparesData) return null;

    return (
        <div className="flex flex-col gap-4 min-h-full">
            <div className="tabs tabs-boxed grid grid-cols-2 -m-4 mb-0">
                <Link className={`tab ${tab === "parts" ? "tab-active" : ""}`} href={`/collection/${id}/parts`}>
                    All Parts
                </Link>
                <Link className={`tab ${tab === "spares" ? "tab-active" : ""}`} href={`/collection/${id}/spares`}>
                    Spares
                </Link>
            </div>
            <div className="flex-1">
                {tab === "parts" && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={partsData.pageCount}
                        emptyTitle="Congratulations!"
                        emptySubtitle="You've found all the parts in this collection"
                    >
                        {partsData.collectionInventoryParts.map((collectionInventoryPart) => (
                            <CollectionInventoryPartCard key={collectionInventoryPart.id} collectionInventoryPart={collectionInventoryPart} />
                        ))}
                    </CardDisplay>
                )}
                {tab === "spares" && (
                    <CardDisplay
                        page={page}
                        setPage={setPage}
                        pageCount={sparesData.pageCount}
                        emptyTitle="Congratulations!"
                        emptySubtitle="You've found all the spares in this collection"
                    >
                        {sparesData.collectionInventoryParts.map((collectionInventoryPart) => (
                            <CollectionInventoryPartCard key={collectionInventoryPart.id} collectionInventoryPart={collectionInventoryPart} />
                        ))}
                    </CardDisplay>
                )}
            </div>
        </div>
    );
};

export default withPageAuthRequired(CollectionPage);
