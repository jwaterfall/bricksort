import mongoose, { Document, Schema, model } from "mongoose";

export interface InventoryPart extends Document {
  inventory: string;
  part: string;
  color: number;
  quantity: number;
  isSpare: boolean;
  imageUrl?: string;
}

const schema = new Schema<InventoryPart>({
  inventory: { type: String, required: true, ref: "Inventory" },
  part: { type: String, required: true, ref: "Part", index: true },
  color: { type: Number, required: true, ref: "Color", index: true },
  quantity: { type: Number, required: true },
  isSpare: { type: Boolean, required: true },
  imageUrl: { type: String },
});

const InventoryPartModel = mongoose.models.InventoryPart || model<InventoryPart>("InventoryPart", schema, "inventory_parts");

export default InventoryPartModel as mongoose.Model<InventoryPart>;
