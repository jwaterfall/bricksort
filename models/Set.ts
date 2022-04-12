import mongoose, { Document, Schema, model } from 'mongoose';

export interface Set extends Document {
  author: string;
  number: string;
  name: string;
  image: string;
}

const schema = new Schema<Set>(
  {
    author: { required: true, index: true, type: String },
    number: {
      required: true,
      type: String,
      index: true,
    },
    name: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const SetModel = mongoose.models.Set || model<Set>('Set', schema, 'sets');

export default SetModel;
