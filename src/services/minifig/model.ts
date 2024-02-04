import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface Minifig extends Document {
	_id: string;
	name: string;
	partCount: number;
	imageUrl: string;
}

const schema = new Schema<Minifig>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		partCount: { type: Number, required: true },
		imageUrl: { type: String, required: true }
	},
	{ timestamps: true }
);

export const MinifigModel: Model<Minifig> =
	mongoose.models?.Minifig ?? model<Minifig>('Minifig', schema, 'minifigs');
