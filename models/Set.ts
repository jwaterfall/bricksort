import mongoose, { Document, Schema, model } from "mongoose";

export interface Set extends Document {
  _id: string;
  name: string;
  year: number;
  theme: number;
  partCount: number;
}

const schema = new Schema<Set>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  theme: { type: Number, required: true, ref: "Theme" },
  partCount: { type: Number, required: true },
});

const SetModel = mongoose.models.Set || model<Set>("Set", schema, "sets");

export default SetModel as mongoose.Model<Set>;
