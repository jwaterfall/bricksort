import mongoose, { Document, Schema, model } from 'mongoose';

import InventoryModel, { Inventory } from './Inventory';
import CollectionInventoryPartModel from './CollectionInventoryPart';

export interface CollectionInventory extends Document {
    user: string;
    inventoryId: string;
    inventory: Inventory;
    totalPartQuantity: number;
    totalPartQuantityFound: number;
}

const schema = new Schema<CollectionInventory>({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    user: { type: String, required: true, index: true },
    inventoryId: { type: String, required: true, index: true },
    totalPartQuantity: { type: Number, required: true },
    totalPartQuantityFound: { type: Number, required: true, default: 0 },
});

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
