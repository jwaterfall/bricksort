import mongoose, { Document, Schema, model } from "mongoose";

export enum PartMaterial {
  PLASTIC = "Plastic",
  RUBBER = "Rubber",
  METAL = "Metal",
  PAPER = "Cardboard/Paper",
  CLOTH = "Cloth",
  FOAM = "Foam",
}

export interface Part extends Document {
  _id: string;
  name: string;
  category: number;
  material: PartMaterial;
}

const schema = new Schema<Part>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: Number, required: true, ref: "PartCategory" },
  material: { type: String, required: true, enum: Object.values(PartMaterial) },
});

const PartModel = mongoose.models.Part || model<Part>("Part", schema, "parts");

export default PartModel as mongoose.Model<Part>;
