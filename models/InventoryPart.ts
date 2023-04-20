import mongoose, { Document, Schema, model } from 'mongoose';

import PartModel, { Part } from './Part';
import ColorModel, { Color } from './Color';

export interface InventoryPart extends Document {
    _id: string;
    quantity: number;
    isSpare: boolean;
    imageUrl?: string;
    inventoryId: string;
    partId: string;
    colorId: string;
    part: Part;
    color: Color;
}

const schema = new Schema<InventoryPart>({
    _id: { type: String, required: true },
    quantity: { type: Number, required: true },
    isSpare: { type: Boolean, required: true },
    imageUrl: { type: String },
    inventoryId: { type: String, required: true },
    partId: { type: String, required: true, index: true },
    colorId: { type: String, required: true, index: true },
});

schema.virtual('part', {
    ref: PartModel,
    localField: 'partId',
    foreignField: '_id',
    justOne: true,
});

schema.virtual('color', {
    ref: ColorModel,
    localField: 'colorId',
    foreignField: '_id',
    justOne: true,
});

schema.set('toJSON', { virtuals: true });

const InventoryPartModel = mongoose.models.InventoryPart ?? model<InventoryPart>('InventoryPart', schema, 'inventory_parts');

export default InventoryPartModel as mongoose.Model<InventoryPart>;
