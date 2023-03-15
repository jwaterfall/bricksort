import { FC } from "react";
import { FaHammer, FaTrash } from "react-icons/fa";
import Image from "next/image";

import useCreateCollectionInventory from "../mutations/useCreateCollectionInventory";
import { ExtendedSet } from "../models/Set";
import { ExtendedCollectionInventory } from "../models/CollectionInventory";
import { AlertType, useAlerts } from "./AlertProvider";
import useDeleteCollectionInventory from "../mutations/useDeleteCollectionInventory";

interface DefaultSetCardProps {
    set: ExtendedSet;
}

interface CollectionInventoryCardProps {
    collectionInventory: ExtendedCollectionInventory;
}

type SetCardProps = DefaultSetCardProps | CollectionInventoryCardProps;

const SetCard: FC<SetCardProps> = (props) => {
    const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();
    const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();
    const { addAlert } = useAlerts();

    const set = "set" in props ? props.set : props.collectionInventory.inventory.set;

    return (
        <div className="card card-compact bg-base-100 shadow-xl h-fit">
            <figure>
                <Image
                    src={set.imageUrl}
                    width={300}
                    height={225}
                    alt={set.name}
                    className="p-4 object-contain w-full aspect-4/3 mix-blend-multiply"
                    priority={true}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {set.name} - #{set._id.endsWith("-1") ? set._id.slice(0, -2) : set._id}
                </h2>
                <p className="font-medium">
                    {set.theme.name} • {set.year} • {set.partCount > 1 ? `${set.partCount} Pieces` : "1 Piece"}
                </p>
                <div className="card-actions mt-4">
                    {"set" in props ? (
                        <button
                            className={`btn btn-primary gap-2 w-full ${isCreating ? "loading" : ""}`}
                            disabled={isCreating}
                            onClick={() => createCollectionInventory(set._id)}
                        >
                            <FaHammer className="h-5 w-5" />
                            Build Set
                        </button>
                    ) : (
                        <button
                            className={`btn btn-primary gap-2 w-full ${isDeleting ? "loading" : ""}`}
                            disabled={isCreating}
                            onClick={() => {
                                addAlert("Are you sure you want to delete this set?", AlertType.Warning, () =>
                                    deleteCollectionInventory(props.collectionInventory._id)
                                );
                            }}
                        >
                            <FaTrash className="h-5 w-5" />
                            Delete Set
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SetCard;
