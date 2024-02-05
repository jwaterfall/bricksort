import mongoose, { Document, Schema, Model, model } from 'mongoose';
import { ColorModel, type Color } from '$services/color';
import { PartModel, type Part } from '$services/part';

export interface Element extends Document {
	_id: string;
	partId: string;
	colorId: string;
	imageUrl?: string;
	part: Part;
	color: Color;
}

const schema = new Schema<Element>(
	{
		_id: { type: String, required: true },
		partId: { type: String, required: true },
		colorId: { type: String, required: true },
		imageUrl: { type: String, required: false }
	},
	{ timestamps: true }
);

schema.index({ partId: 1, colorId: 1 }, { unique: true });

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

export const ElementModel: Model<Element> =
	mongoose.models?.Element ?? model<Element>('Element', schema, 'elements');
