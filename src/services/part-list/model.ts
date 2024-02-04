import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { InventoryModel, type Inventory } from '$services/inventory';

export interface PartList extends Document {
	userId: string;
	inventoryId?: string;
	inventory?: Inventory;
	partQuantity?: number;
	partQuantityFound?: number;
}

const schema = new Schema<PartList>(
	{
		userId: { type: String, required: true, index: true },
		inventoryId: { type: String, required: false, index: true }
	},
	{ timestamps: true }
);

schema.virtual('inventory', {
	ref: InventoryModel,
	localField: 'inventoryId',
	foreignField: '_id',
	justOne: true
});

schema.set('toJSON', { virtuals: true });

export const PartListModel: Model<PartList> =
	mongoose.models?.PartList ?? model<PartList>('PartList', schema, 'part_lists');
