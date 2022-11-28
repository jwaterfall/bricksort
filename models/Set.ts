import mongoose, { Document, Model, Schema, model } from 'mongoose';

export interface Set extends Document {
  author: string;
  number: string;
  name: string;
  image: string;
  partQuantityTotal: number;
  partQuantityFound: number;
  percentageComplete: number;
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
    partQuantityTotal: {
      required: true,
      type: Number,
      min: 0,
      default: 0,
    },
    partQuantityFound: {
      required: true,
      type: Number,
      min: 0,
      default: 0,
    },
    percentageComplete: {
      required: true,
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  { timestamps: true },
);

//  when updating a set, we need to update the percentage complete using the following formula: (partQuantityFound / partQuantityTotal) * 100
async function updatePercentageComplete(set: Set) {
  const percentageComplete = (set.partQuantityFound / set.partQuantityTotal) * 100;
  set.percentageComplete = percentageComplete;
}

schema.pre('save', updatePercentageComplete);
schema.pre('findOneAndUpdate', updatePercentageComplete);

const SetModel = mongoose.models.Set || model<Set>('Set', schema, 'sets');

export default SetModel as Model<Set>;
