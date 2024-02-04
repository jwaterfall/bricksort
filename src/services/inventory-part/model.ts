import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { PartModel, type Part } from '$services/part';
import { ColorModel, type Color } from '$services/color';

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

const schema = new Schema<InventoryPart>(
	{
		_id: { type: String, required: true },
		quantity: { type: Number, required: true },
		isSpare: { type: Boolean, required: true },
		imageUrl: { type: String },
		inventoryId: { type: String, required: true, index: true },
		partId: { type: String, required: true, index: true },
		colorId: { type: String, required: true, index: true }
	},
	{ timestamps: true }
);

schema.virtual('part', {
	ref: PartModel,
	localField: 'partId',
	foreignField: '_id',
	justOne: true
});

schema.virtual('color', {
	ref: ColorModel,
	localField: 'colorId',
	foreignField: '_id',
	justOne: true
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

export const InventoryPartModel: Model<InventoryPart> =
	mongoose.models?.InventoryPart ??
	model<InventoryPart>('InventoryPart', schema, 'inventory_parts');
