import { FC } from "react";
import { MdOutlineHandyman } from "react-icons/md";
import Image from "next/image";

import { ExtendedSet } from "../../models/Set";
import Button from "../Button";
import Card from "../Card";
import Typography from "../Typography";

import useCreateCollectionInventory from "../../mutations/useCreateCollectionInventory";

interface SetCardProps {
    set: ExtendedSet;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
    const { mutate: createCollectionInventory } = useCreateCollectionInventory();

    return (
        <Card key={set._id}>
            <div className="-m-6 mb-0 bg-gray-50">
                <Image
                    src={set.imageUrl}
                    width={300}
                    height={225}
                    alt={set.name}
                    className="p-4 object-contain w-full aspect-4/3 mix-blend-multiply"
                />
            </div>
            <div>
                <Typography size="xs" weight="medium" color="secondary" truncate>
                    {set.theme.name}
                </Typography>
                <Typography size="lg" weight="medium" truncate>
                    {set.name}
                </Typography>
                <div className="mt-2 flex items-end justify-between gap-2">
                    <Typography size="xs" color="secondary" truncate>
                        #{set._id.endsWith("-1") ? set._id.slice(0, -2) : set._id} • {set.partCount > 1 ? `${set.partCount} Pieces` : "1 Piece"} •{" "}
                        {set.year}
                    </Typography>
                    <Button Icon={MdOutlineHandyman} color="primary" size="sm" shape="square" onClick={() => createCollectionInventory(set._id)} />
                </div>
            </div>
        </Card>
    );
};

export default SetCard;
