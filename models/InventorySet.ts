import mongoose, { Document, Schema, model } from "mongoose";

// @ts-expect-error
export interface InventorySet extends Document {
  _id: string;
  inventory: string;
  set: string;
  quantity: number;
}

const schema = new Schema<InventorySet>({
  _id: { type: String, required: true },
  inventory: { type: String, required: true, ref: "Inventory", index: true },
  set: { type: String, required: true, ref: "Set", index: true },
  quantity: { type: Number, required: true },
});

const InventorySetModel = mongoose.models.InventorySet || model<InventorySet>("InventorySet", schema, "inventory_sets");

export default InventorySetModel as mongoose.Model<InventorySet>;
