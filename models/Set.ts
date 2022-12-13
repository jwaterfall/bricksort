import mongoose, { Document, Schema, model } from "mongoose";
import { Theme } from "./Theme";

export interface Set extends Document {
  _id: string;
  name: string;
  year: number;
  theme: string;
  partCount: number;
  imageUrl: string;
}

export interface ExtendedSet extends Omit<Set, "theme"> {
  theme: Theme;
}

const schema = new Schema<Set>({
  _id: { type: String, required: true },
  name: { type: String, required: true, index: true },
  year: { type: Number, required: true, index: true },
  theme: { type: String, required: true, ref: "Theme", index: true },
  partCount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const SetModel = mongoose.models.Set || model<Set>("Set", schema, "sets");

export default SetModel as mongoose.Model<Set>;
