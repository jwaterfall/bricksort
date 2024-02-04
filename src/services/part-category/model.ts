import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface PartCategory extends Document {
	_id: string;
	name: string;
}

const schema = new Schema<PartCategory>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true }
	},
	{ timestamps: true }
);

export const PartCategoryModel: Model<PartCategory> =
	mongoose.models?.PartCategory ?? model<PartCategory>('PartCategory', schema, 'part_categories');
