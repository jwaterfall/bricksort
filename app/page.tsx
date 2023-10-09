import { Session, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { FaCar, FaPuzzlePiece, FaWrench } from 'react-icons/fa';

import { connectToDatabase } from '@/lib/utils';
import CollectionInventoryModel from '@/models/CollectionInventory';

const HomePage = async () => {
  const session = (await getSession()) as Session;

  await connectToDatabase();

  const user = session.user;

  const setCount = await CollectionInventoryModel.countDocuments({ user: user.sub });

  const response = await CollectionInventoryModel.aggregate([
    {
      $match: {
        user: user.sub,
      },
    },
    {
      $group: {
        _id: null,
        quantity: {
          $sum: '$partQuantity',
        },
        quantityFound: {
          $sum: '$partQuantityFound',
        },
        spareQuantity: {
          $sum: '$sparePartQuantity',
        },
        spareQuantityFound: {
          $sum: '$sparePartQuantityFound',
        },
      },
    },
  ]);

  const partQuantity = response[0]?.quantity ?? 0;
  const partQuantityFound = response[0]?.quantityFound ?? 0;
  const sparePartQuantity = response[0]?.spareQuantity ?? 0;
  const sparePartQuantityFound = response[0]?.spareQuantityFound ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border rounded-md">
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-muted-foreground">Sets in your collection</div>
          <div className="font-bold text-4xl">{setCount}</div>
        </div>
        <FaCar size={32} className="text-primary" />
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-muted-foreground">Parts found</div>
          <div className="font-bold text-4xl">{Math.round((partQuantityFound / partQuantity) * 100) || 0}%</div>
          <div className="text-xs text-muted-foreground">
            {partQuantityFound} of {partQuantity}
          </div>
        </div>
        <FaPuzzlePiece size={32} className="text-primary" />
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-muted-foreground">Spare parts found</div>
          <div className="font-bold text-4xl">{Math.round((sparePartQuantityFound / sparePartQuantity) * 100) || 0}%</div>
          <div className="text-xs text-muted-foreground">
            {sparePartQuantityFound} of {sparePartQuantity}
          </div>
        </div>
        <FaWrench size={32} className="text-primary" />
      </div>
    </div>
  );
};

export default withPageAuthRequired(HomePage);
