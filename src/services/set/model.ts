import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { ThemeModel, type Theme } from '../theme/model.js';

export interface Set extends Document {
	_id: string;
	name: string;
	year: number;
	partCount: number;
	imageUrl: string;
	themeId: string;
	theme: Theme;
}

const schema = new Schema<Set>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true, index: true },
		year: { type: Number, required: true, index: true },
		partCount: { type: Number, required: true },
		imageUrl: { type: String, required: true },
		themeId: { type: String, required: true, index: true }
	},
	{ timestamps: true }
);

schema.virtual('theme', {
	ref: ThemeModel,
	localField: 'themeId',
	foreignField: '_id',
	justOne: true
});

schema.set('toJSON', { virtuals: true });

export const SetModel: Model<Set> = mongoose.models?.Set ?? model<Set>('Set', schema, 'sets');
