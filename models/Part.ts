import mongoose, { Document, Model, Schema, model } from 'mongoose';

import SetModel, { Set } from './Set';

export interface Part extends Document {
  author: string;
  parent: Set;
  number: string;
  name: string;
  quantityFound: number;
  quantityTotal: number;
  color: string;
  image?: string;
  isSpare: boolean;
  rebrickableId: number;
}

const schema = new Schema<Part>(
  {
    author: { required: true, index: true, type: String },
    parent: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: SetModel,
      index: true,
    },
    number: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    quantityFound: {
      required: true,
      type: Number,
      min: 0,
      default: 0,
    },
    quantityTotal: {
      required: true,
      type: Number,
      min: 0,
    },
    color: {
      required: true,
      type: String,
    },
    isSpare: {
      required: true,
      type: Boolean,
    },
    rebrickableId: {
      required: true,
      type: Number,
    },
    image: String,
  },
  { timestamps: true },
);

const PartModel = mongoose.models.Part || model<Part>('Part', schema, 'parts');

export default PartModel as Model<Part>;
