import mongoose, { Document, Schema, model } from 'mongoose';

import InventoryModel, { type Inventory } from './Inventory';
import CollectionInventoryPartModel from './CollectionInventoryPart';

export interface CollectionInventory extends Document {
  user: string;
  partQuantity: number;
  partQuantityFound: number;
  sparePartQuantity: number;
  sparePartQuantityFound: number;
  inventoryId: string;
  inventory: Inventory;
}

const schema = new Schema<CollectionInventory>(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    user: { type: String, required: true, index: true },
    partQuantity: { type: Number, required: true },
    partQuantityFound: { type: Number, required: true, default: 0 },
    sparePartQuantity: { type: Number, required: true },
    sparePartQuantityFound: { type: Number, required: true, default: 0 },
    inventoryId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

schema.virtual('inventory', {
  ref: InventoryModel,
  localField: 'inventoryId',
  foreignField: '_id',
  justOne: true,
});

schema.set('toJSON', { virtuals: true });

schema.pre('findOneAndDelete', async function (next) {
  await CollectionInventoryPartModel.deleteMany({ collectionInventoryId: this.getQuery()._id });
  next();
});

const CollectionInventoryModel =
  mongoose.models.CollectionInventory ?? model<CollectionInventory>('CollectionInventory', schema, 'collection_inventories');

export default CollectionInventoryModel as mongoose.Model<CollectionInventory>;
