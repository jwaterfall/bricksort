import { FC } from "react";
import { MdOutlineHandyman } from "react-icons/md";
import Image from "next/image";

import { ExtendedSet } from "../models/Set";
import Button from "./Button";

interface SetListProps {
    sets: ExtendedSet[];
}

const SetList: FC<SetListProps> = ({ sets }) => (
    <div className="grid grid-cols-4 gap-4 overflow-hidden w-fit">
        {sets.map((set) => (
            <div className="rounded-md border border-slate-300" key={set._id}>
                <Image
                    src={set.imageUrl}
                    width={300}
                    height={225}
                    alt={set.name}
                    className="p-4 object-contain w-full aspect-4/3 mix-blend-multiply"
                />
                <div className="p-4 font-medium border-t border-slate-300 text-left">
                    <h3 className="truncate text-slate-500 text-xs">{set._id.split("-")[0]}</h3>
                    <h3 className="truncate font-medium text-xl mb-2">{set.name}</h3>
                    <h3 className="text-xs text-slate-500 mb-4 truncate">
                        {set.year} • {set.theme.name} • {set.partCount > 1 ? `${set.partCount} Pieces` : "1 Piece"}
                    </h3>
                    <Button Icon={MdOutlineHandyman} size="sm">
                        Build this set
                    </Button>
                </div>
            </div>
        ))}
    </div>
);

export default SetList;
