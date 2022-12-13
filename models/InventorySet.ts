import mongoose, { Document, Schema, model } from "mongoose";

// @ts-expect-error
export interface InventorySet extends Document {
  inventory: string;
  set: string;
  quantity: number;
}

const schema = new Schema<InventorySet>({
  inventory: { type: String, required: true, ref: "Inventory", index: true },
  set: { type: String, required: true, ref: "Set", index: true },
  quantity: { type: Number, required: true },
});

const InventorySetModel = mongoose.models.InventorySet || model<InventorySet>("InventorySet", schema, "inventory_sets");

export default InventorySetModel as mongoose.Model<InventorySet>;
