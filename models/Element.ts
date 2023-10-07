import mongoose, { Document, Schema, model } from 'mongoose';

export interface Element extends Document {
  _id: string;
  partId: string;
  colorId: string;
}

const schema = new Schema<Element>(
  {
    _id: { type: String, required: true },
    partId: { type: String, required: true },
    colorId: { type: String, required: true },
  },
  { timestamps: true }
);

const ElementModel = mongoose.models.Element ?? model<Element>('Element', schema, 'elements');

export default ElementModel as mongoose.Model<Element>;
