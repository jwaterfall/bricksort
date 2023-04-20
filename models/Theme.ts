import mongoose, { Document, Schema, model } from 'mongoose';

export interface Theme extends Document {
    _id: string;
    name: string;
    setCount: number;
    parentId: string | null;
}

const schema = new Schema<Theme>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    setCount: { type: Number, required: true },
    parentId: { type: String },
});

const ThemeModel = mongoose.models.Theme ?? model<Theme>('Theme', schema, 'themes');

export default ThemeModel as mongoose.Model<Theme>;
