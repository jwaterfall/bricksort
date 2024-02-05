import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { SetModel, type Set } from '../set/model.js';

export interface Inventory extends Omit<Document, 'set'> {
	_id: string;
	version: number;
	setId: string;
	set: Set;
}

const schema = new Schema<Inventory>(
	{
		_id: { type: String, required: true },
		version: { type: Number, required: true },
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

schema.set('toJSON', { virtuals: true });

export const InventoryModel: Model<Inventory> =
	mongoose.models?.Inventory ?? model<Inventory>('Inventory', schema, 'inventories');
