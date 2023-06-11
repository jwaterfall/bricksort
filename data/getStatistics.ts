import connectToDatabase from '@/data/connectToDatabase';
import CollectionInventoryModel from '@/models/CollectionInventory';

const getStatistics = async () => {
  await connectToDatabase();

  const setCount = await CollectionInventoryModel.countDocuments();

  const partQuantity = await CollectionInventoryModel.aggregate([
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

  return {
    setCount,
    partQuantity: partQuantity[0]?.quantity ?? 0,
    partQuantityFound: partQuantity[0]?.quantityFound ?? 0,
    sparePartQuantity: partQuantity[0]?.spareQuantity ?? 0,
    sparePartQuantityFound: partQuantity[0]?.spareQuantityFound ?? 0,
  };
};

export default getStatistics;
