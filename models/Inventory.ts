import mongoose, { Document, Schema, model } from "mongoose";

// @ts-expect-error
export interface Inventory extends Document {
  _id: string;
  version: number;
  set: string;
}

const schema = new Schema<Inventory>({
  _id: { type: String, required: true },
  version: { type: Number, required: true },
  set: { type: String, required: true, ref: "Set", index: true },
});

const InventoryModel = mongoose.models.Inventory || model<Inventory>("Inventory", schema, "inventories");

export default InventoryModel as mongoose.Model<Inventory>;
