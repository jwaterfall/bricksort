import mongoose, { Document, Schema, model } from "mongoose";

export interface Theme extends Document {
  _id: number;
  name: string;
  parent: number | null;
}

const schema = new Schema<Theme>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  parent: { type: Number, ref: "Theme" },
});

const ThemeModel = mongoose.models.Theme || model<Theme>("Theme", schema, "themes");

export default ThemeModel as mongoose.Model<Theme>;
