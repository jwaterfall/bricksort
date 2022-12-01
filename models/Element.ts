import mongoose, { Document, Schema, model } from "mongoose";

export interface Element extends Document {
  _id: string;
  part: string;
  color: string;
}

const schema = new Schema<Element>({
  _id: { type: String, required: true },
  part: { type: String, required: true, ref: "Part" },
  color: { type: String, required: true, ref: "Color" },
});

const ElementModel = mongoose.models.Element || model<Element>("Element", schema, "elements");

export default ElementModel as mongoose.Model<Element>;
