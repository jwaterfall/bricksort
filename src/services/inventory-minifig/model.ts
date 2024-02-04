import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { MinifigModel, type Minifig } from '$services/minifig';

export interface InventoryMinifig extends Document {
	_id: string;
	quantity: number;
	inventoryId: string;
	minifigId: string;
	minifig: Minifig;
}

const schema = new Schema<InventoryMinifig>(
	{
		_id: { type: String, required: true },
		quantity: { type: Number, required: true },
		inventoryId: { type: String, required: true },
		minifigId: { type: String, required: true, index: true }
	},
	{ timestamps: true }
);

schema.virtual('minifig', {
	ref: MinifigModel,
	localField: 'minifigId',
	foreignField: '_id',
	justOne: true
});

export const InventoryMinifigModel: Model<InventoryMinifig> =
	mongoose.models?.InventoryMinifig ??
	model<InventoryMinifig>('InventoryMinifig', schema, 'inventory_minifigs');
