import { FC } from "react";
import { FaHammer } from "react-icons/fa";
import Image from "next/image";

import useCreateCollectionInventory from "../mutations/useCreateCollectionInventory";
import { ExtendedSet } from "../models/Set";

interface SetCardProps {
    set: ExtendedSet;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
    const { mutate: createCollectionInventory, isLoading } = useCreateCollectionInventory();

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <Image
                    src={set.imageUrl}
                    width={300}
                    height={225}
                    alt={set.name}
                    className="p-4 object-contain w-full aspect-4/3 mix-blend-multiply"
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
                    <button
                        className={`btn btn-primary gap-2 w-full ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                        onClick={() => createCollectionInventory(set._id)}
                    >
                        <FaHammer className="h-5 w-5" />
                        Build Set
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetCard;
