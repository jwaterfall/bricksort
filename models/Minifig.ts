import mongoose, { Document, Schema, model } from 'mongoose';

export interface Minifig extends Document {
    _id: string;
    name: string;
    partCount: number;
    imageUrl: string;
}

const schema = new Schema<Minifig>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    partCount: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

const MinifigModel = mongoose.models.Minifig ?? model<Minifig>('Minifig', schema, 'minifigs');

export default MinifigModel as mongoose.Model<Minifig>;
