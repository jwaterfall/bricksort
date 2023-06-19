import mongoose, { Document, Schema, model } from 'mongoose';

import InventoryPartModel, { InventoryPart } from './InventoryPart';
import CollectionInventoryModel from './CollectionInventory';

export interface CollectionInventoryPart extends Document {
    collectionInventoryId: Schema.Types.ObjectId;
    inventoryPartId: string;
    inventoryPart: InventoryPart;
    user: string;
    quantityFound: number;
    quantity: number;
    addQuantityFound: (quantityFound: number) => Promise<number>;
}

const schema = new Schema<CollectionInventoryPart>(
    {
        user: { type: String, required: true, index: true },
        collectionInventoryId: { type: Schema.Types.ObjectId, required: true, index: true },
        inventoryPartId: { type: String, required: true, index: true },
        quantity: { type: Number, required: true },
        quantityFound: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

schema.virtual('inventoryPart', {
    ref: InventoryPartModel,
    localField: 'inventoryPartId',
    foreignField: '_id',
    justOne: true,
});

schema.set('toJSON', { virtuals: true });

schema.methods.addQuantityFound = async function (quantityFound: number) {
    const clampedQuantity = Math.max(-this.quantityFound, Math.min(quantityFound, this.quantity - this.quantityFound));

    await CollectionInventoryModel.findByIdAndUpdate(this.collectionInventoryId, {
        $inc: { partQuantityFound: clampedQuantity },
    });

    this.quantityFound += clampedQuantity;
    await this.save();

    return clampedQuantity;
};

const CollectionInventoryPartModel =
    mongoose.models.CollectionInventoryPart ?? model<CollectionInventoryPart>('CollectionInventoryPart', schema, 'collection_inventory_parts');

export default CollectionInventoryPartModel as mongoose.Model<CollectionInventoryPart>;
