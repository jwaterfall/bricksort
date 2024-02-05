import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { ElementModel, type Element } from '../element/model.js';

export interface InventoryPart extends Document {
	_id: string;
	quantity: number;
	isSpare: boolean;
	inventoryId: string;
	elementId: string;
	element: Element;
}

const schema = new Schema<InventoryPart>(
	{
		_id: { type: String, required: true },
		quantity: { type: Number, required: true },
		isSpare: { type: Boolean, required: true },
		inventoryId: { type: String, required: true, index: true },
		elementId: { type: String, required: true, index: true }
	},
	{ timestamps: true }
);

schema.virtual('element', {
	ref: ElementModel,
	localField: 'elementId',
	foreignField: '_id',
	justOne: true
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

export const InventoryPartModel: Model<InventoryPart> =
	mongoose.models?.InventoryPart ??
	model<InventoryPart>('InventoryPart', schema, 'inventory_parts');
