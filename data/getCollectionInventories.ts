import connectToDatabase from '@/data/connectToDatabase';
import CollectionInventoryModel from '@/models/CollectionInventory';

const getCollectionInventories = async () => {
  await connectToDatabase();

  const collectionInventories = await CollectionInventoryModel.find()
    .populate({
      path: 'inventory',
      populate: {
        path: 'set',
        populate: {
          path: 'theme',
        },
      },
    })
    .exec();

  return collectionInventories.map((collectionInventory) => collectionInventory.toJSON());
};

export default getCollectionInventories;
