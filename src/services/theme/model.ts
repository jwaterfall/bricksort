import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface Theme extends Document {
	_id: string;
	name: string;
	setCount: number;
	parentId: string | null;
}

const schema = new Schema<Theme>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		parentId: { type: String }
	},
	{ timestamps: true }
);

export const ThemeModel: Model<Theme> =
	mongoose.models?.Theme ?? model<Theme>('Theme', schema, 'themes');
