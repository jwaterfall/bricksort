import mongoose, { Document, Schema, model } from "mongoose";

export interface Theme extends Document {
  _id: string;
  name: string;
  parent: string | null;
  setCount: number;
}

const schema = new Schema<Theme>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  parent: { type: String, ref: "Theme" },
  setCount: { type: Number, required: true },
});

const ThemeModel = mongoose.models.Theme || model<Theme>("Theme", schema, "themes");

export default ThemeModel as mongoose.Model<Theme>;
