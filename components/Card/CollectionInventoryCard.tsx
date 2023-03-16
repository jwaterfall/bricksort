import { FC } from "react";
import { FaTrash } from "react-icons/fa";

import Card from ".";
import useDeleteCollectionInventory from "../../mutations/useDeleteCollectionInventory";
import { ExtendedCollectionInventory } from "../../models/CollectionInventory";
import { AlertType, useAlerts } from "../AlertProvider";

interface CollectionInventoryCardProps {
    collectionInventory: ExtendedCollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
    const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();
    const { addAlert } = useAlerts();

    const set = collectionInventory.inventory.set;

    return (
        <Card
            title={`${set.name} - #${set._id.endsWith("-1") ? set._id.slice(0, -2) : set._id}`}
            body={`${set.theme.name} • ${set.year} • ${set.partCount > 1 ? `${set.partCount} Pieces` : "1 Piece"}`}
            imgSrc={set.imageUrl}
            imgAlt={set.name}
            href={`/collection/${collectionInventory._id}/parts`}
        >
            <button
                className={`btn btn-primary gap-2 w-full ${isDeleting ? "loading" : ""}`}
                disabled={isDeleting}
                onClick={(e) => {
                    e.preventDefault();
                    addAlert("Are you sure you want to delete this set?", AlertType.Warning, () =>
                        deleteCollectionInventory(collectionInventory._id)
                    );
                }}
            >
                <FaTrash className="h-5 w-5" />
                Delete Set
            </button>
        </Card>
    );
};

export default CollectionInventoryCard;
