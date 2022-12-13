import mongoose, { Document, Schema, model } from "mongoose";

export interface InventoryMinifig extends Document {
  inventory: string;
  minifig: string;
  quantity: number;
}

const schema = new Schema<InventoryMinifig>({
  inventory: { type: String, required: true, ref: "Inventory" },
  minifig: { type: String, required: true, ref: "Minifig", index: true },
  quantity: { type: Number, required: true },
});

const InventoryMinifigModel = mongoose.models.InventoryMinifig || model<InventoryMinifig>("InventoryMinifig", schema, "inventory_minifigs");

export default InventoryMinifigModel as mongoose.Model<InventoryMinifig>;
