import mongoose, { Document, Schema, model } from 'mongoose';

import { PartCategory } from './PartCategory';

export enum PartMaterial {
    PLASTIC = 'Plastic',
    RUBBER = 'Rubber',
    METAL = 'Metal',
    PAPER = 'Cardboard/Paper',
    CLOTH = 'Cloth',
    FOAM = 'Foam',
}

export interface Part extends Document {
    _id: string;
    name: string;
    material: PartMaterial;
    categoryId: number;
    category: PartCategory;
}

const schema = new Schema<Part>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    material: { type: String, required: true, enum: Object.values(PartMaterial) },
    categoryId: { type: Number, required: true, ref: 'PartCategory' },
});

const PartModel = mongoose.models.Part ?? model<Part>('Part', schema, 'parts');

export default PartModel as mongoose.Model<Part>;
