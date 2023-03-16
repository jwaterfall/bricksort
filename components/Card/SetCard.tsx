import { FC } from "react";
import { FaHammer } from "react-icons/fa";

import Card from ".";
import useCreateCollectionInventory from "../../mutations/useCreateCollectionInventory";
import { ExtendedSet } from "../../models/Set";

interface SetCardProps {
    set: ExtendedSet;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
    const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();

    return (
        <Card
            title={`${set.name} - #${set._id.endsWith("-1") ? set._id.slice(0, -2) : set._id}`}
            body={`${set.theme.name} • ${set.year} • ${set.partCount > 1 ? `${set.partCount} Pieces` : "1 Piece"}`}
            imgSrc={set.imageUrl}
            imgAlt={set.name}
        >
            <button
                className={`btn btn-primary gap-2 w-full ${isCreating ? "loading" : ""}`}
                disabled={isCreating}
                onClick={() => createCollectionInventory(set._id)}
            >
                <FaHammer className="h-5 w-5" />
                Build Set
            </button>
        </Card>
    );
};

export default SetCard;
