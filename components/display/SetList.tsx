import { FC } from "react";
import { MdOutlineHandyman } from "react-icons/md";
import Image from "next/image";

import { ExtendedSet } from "../../models/Set";
import Button from "../actions/Button";
import Typography from "../actions/Typography";

interface SetListProps {
    sets: ExtendedSet[];
}

const SetList: FC<SetListProps> = ({ sets }) => (
    <div className="grid grid-cols-5 gap-4">
        {sets.map((set) => (
            <div className="bg-slate-100 border-slate-300 border rounded-md transition-transform hover:scale-105" key={set._id}>
                <Image
                    src={set.imageUrl}
                    width={300}
                    height={225}
                    alt={set.name}
                    className="p-4 object-contain w-full aspect-4/3 mix-blend-multiply"
                />
                <div className="p-4 border-t border-slate-300">
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

                        <Button Icon={MdOutlineHandyman} color="primary" size="sm" shape="circle" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default SetList;
