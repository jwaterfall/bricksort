import mongoose, { Document, Schema, model } from 'mongoose';

import MinifigModel, { Minifig } from './Minifig';

export interface InventoryMinifig extends Document {
    _id: string;
    quantity: number;
    inventoryId: string;
    minifigId: string;
    minifig: Minifig;
}

const schema = new Schema<InventoryMinifig>({
    _id: { type: String, required: true },
    quantity: { type: Number, required: true },
    inventoryId: { type: String, required: true },
    minifigId: { type: String, required: true, index: true },
});

const InventoryMinifigModel = mongoose.models.InventoryMinifig ?? model<InventoryMinifig>('InventoryMinifig', schema, 'inventory_minifigs');

export default InventoryMinifigModel as mongoose.Model<InventoryMinifig>;
