import mongoose, { Document, Schema, model } from 'mongoose';

export interface PartCategory extends Document {
    _id: string;
    name: string;
}

const schema = new Schema<PartCategory>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const PartCategoryModel = mongoose.models.PartCategory ?? model<PartCategory>('PartCategory', schema, 'part_categories');

export default PartCategoryModel as mongoose.Model<PartCategory>;
