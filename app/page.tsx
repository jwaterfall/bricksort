import Link from 'next/link';
import { MdOutlineDirectionsCar, MdOutlineExtension, MdOutlineHandyman } from 'react-icons/md';

import getStatistics from '@/data/getStatistics';
import Button from '@/components/actions/Button';
import Card, { CardTitle } from '@/components/display/Card';

const HomePage = async () => {
  const { setCount, partQuantity, partQuantityFound, sparePartQuantity, sparePartQuantityFound } = await getStatistics();

  return (
    <>
      <h2 className="text-2xl font-medium my-4">My Collection</h2>
      <Card>
        <CardTitle>Statistics</CardTitle>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-zinc-600 dark:text-zinc-400">Number of sets</div>
              <div className="font-bold text-4xl">{setCount}</div>
            </div>
            <MdOutlineDirectionsCar size={32} className="text-amber-300" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-zinc-600 dark:text-zinc-400">Parts found</div>
              <div className="font-bold text-4xl">{Math.round((partQuantityFound / partQuantity) * 100) || 0}%</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-500">
                {partQuantityFound} of {partQuantity}
              </div>
            </div>
            <MdOutlineExtension size={32} className="text-amber-300" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-zinc-600 dark:text-zinc-400">Spare parts found</div>
              <div className="font-bold text-4xl">{Math.round((sparePartQuantityFound / sparePartQuantity) * 100) || 0}%</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-500">
                {sparePartQuantityFound} of {sparePartQuantity}
              </div>
            </div>
            <MdOutlineHandyman size={32} className="text-amber-300" />
          </div>
        </div>
        <Link href="/browse">
          <Button color="secondary" isFullWidth>
            Browse your collection
          </Button>
        </Link>
      </Card>
      <h2 className="text-2xl font-medium my-4">My Collection</h2>
    </>
  );
};

export default HomePage;
