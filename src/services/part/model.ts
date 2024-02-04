import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { type PartCategory } from '$services/part-category';

export enum PartMaterial {
	PLASTIC = 'Plastic',
	RUBBER = 'Rubber',
	METAL = 'Metal',
	PAPER = 'Cardboard/Paper',
	CLOTH = 'Cloth',
	FOAM = 'Foam',
	FLEXIBLE_PLASTIC = 'Flexible Plastic'
}

export interface Part extends Document {
	_id: string;
	name: string;
	material: PartMaterial;
	categoryId: string;
	category: PartCategory;
}

const schema = new Schema<Part>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		material: { type: String, required: true, enum: Object.values(PartMaterial) },
		categoryId: { type: String, required: true }
	},
	{ timestamps: true }
);

schema.virtual('category', {
	ref: 'PartCategory',
	localField: 'categoryId',
	foreignField: '_id',
	justOne: true
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

export const PartModel: Model<Part> = mongoose.models?.Part ?? model<Part>('Part', schema, 'parts');
