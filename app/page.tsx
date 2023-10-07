'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FaCar, FaPuzzlePiece, FaWrench } from 'react-icons/fa';

import useCollectionStatistics from '../queries/useCollectionStatistics';

const HomePage = () => {
  const { data, isLoading } = useCollectionStatistics();

  if (isLoading || !data) return null;

  const { setCount, partQuantity, partQuantityFound, sparePartQuantity, sparePartQuantityFound } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-100 border border-zinc-300 rounded-sm">
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-zinc-600">Sets in your collection</div>
          <div className="font-bold text-4xl">{setCount}</div>
        </div>
        <FaCar size={32} className="text-red-500" />
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-zinc-600">Parts found</div>
          <div className="font-bold text-4xl">{Math.round((partQuantityFound / partQuantity) * 100) || 0}%</div>
          <div className="text-xs text-zinc-6000">
            {partQuantityFound} of {partQuantity}
          </div>
        </div>
        <FaPuzzlePiece size={32} className="text-red-500" />
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-zinc-600">Spare parts found</div>
          <div className="font-bold text-4xl">{Math.round((sparePartQuantityFound / sparePartQuantity) * 100) || 0}%</div>
          <div className="text-xs text-zinc-6000">
            {sparePartQuantityFound} of {sparePartQuantity}
          </div>
        </div>
        <FaWrench size={32} className="text-red-500" />
      </div>
    </div>
  );
};

export default withPageAuthRequired(HomePage);
