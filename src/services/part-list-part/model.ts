import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface PartListPart extends Document {
	partListId: Schema.Types.ObjectId;
	userId: string;
	elementId: string;
	quantity: number;
}

const schema = new Schema<PartListPart>(
	{
		partListId: { type: Schema.Types.ObjectId, required: true, index: true },
		userId: { type: String, required: true, index: true },
		elementId: { type: String, required: true, index: true },
		quantity: { type: Number, required: true, default: 0 }
	},
	{ timestamps: true }
);

schema.index({ partListId: 1, userId: 1, elementId: 1 }, { unique: true });

export const PartListPartModel: Model<PartListPart> =
	mongoose.models?.PartListPart ?? model<PartListPart>('PartListPart', schema, 'part_list_parts');
