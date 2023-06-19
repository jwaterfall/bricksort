import mongoose, { Document, Schema, model } from 'mongoose';

import { Set } from './Set';

// @ts-expect-error
export interface InventorySet extends Document {
    _id: string;
    quantity: number;
    inventoryId: string;
    setId: string;
    set: Set;
}

const schema = new Schema<InventorySet>(
    {
        _id: { type: String, required: true },
        quantity: { type: Number, required: true },
        inventoryId: { type: String, required: true, index: true },
        setId: { type: String, required: true, index: true },
    },
    { timestamps: true }
);

const InventorySetModel = mongoose.models.InventorySet ?? model<InventorySet>('InventorySet', schema, 'inventory_sets');

export default InventorySetModel as mongoose.Model<InventorySet>;
