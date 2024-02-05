import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { SetModel, type Set } from '../set/model.js';

export interface InventorySet extends Omit<Document, 'set'> {
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
		setId: { type: String, required: true, index: true }
	},
	{ timestamps: true }
);

schema.virtual('set', {
	ref: SetModel,
	localField: 'setId',
	foreignField: '_id',
	justOne: true
});

export const InventorySetModel: Model<InventorySet> =
	mongoose.models?.InventorySet ?? model<InventorySet>('InventorySet', schema, 'inventory_sets');
