import mongoose, { Document, Schema, model } from "mongoose";

export interface Color extends Document {
  _id: number;
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  isTranslucent: boolean;
}

const schema = new Schema<Color>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
  rgb: { type: String, required: true },
  hsl: { type: String, required: true },
  isTranslucent: { type: Boolean, required: true },
});

const ColorModel = mongoose.models.Color || model<Color>("Color", schema, "colors");

export default ColorModel as mongoose.Model<Color>;
