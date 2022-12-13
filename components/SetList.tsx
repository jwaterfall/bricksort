import Image from "next/image";
import { FC } from "react";

import { ExtendedSet } from "../models/Set";

interface SetListProps {
  sets: ExtendedSet[];
}

const SetList: FC<SetListProps> = ({ sets }) => (
  <div className="grid grid-cols-5 gap-4">
    {sets.map((set) => (
      <div key={set._id} className="bg-slate-50 border border-slate-200 rounded-md">
        <Image
          src={set.imageUrl}
          width={200}
          height={200}
          alt={set.name}
          className="p-4 object-contain w-full h-40 border-b border-slate-200 mix-blend-multiply"
        />
        <div className="p-4 font-medium">
          <h3 className="grow truncate mb-2">
            {set._id.split("-")[0]} - {set.name}
          </h3>
          <h3 className="text-xs">
            <span className=" text-slate-500">Year: </span>
            {set.year}
          </h3>
          <h3 className="text-xs">
            <span className=" text-slate-500">Theme: </span>
            {set.theme.name}
          </h3>
          <h3 className="text-xs">
            <span className="text-slate-500">Pieces: </span>
            {set.partCount}
          </h3>
        </div>
      </div>
    ))}
  </div>
);

export default SetList;
