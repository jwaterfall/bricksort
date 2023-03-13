import mongoose, { Document, Schema, model } from "mongoose";

export interface CollectionInventorySet extends Document {
  user: string;
  collectionInventory: string;
  inventorySet: string;
  quantityFound: number;
}

const schema = new Schema<CollectionInventorySet>({
  user: { type: String, required: true, index: true },
  collectionInventory: { type: String, required: true, ref: "CollectionInventory", index: true },
  inventorySet: { type: String, required: true, ref: "InventorySet", index: true },
  quantityFound: { type: Number, required: true, default: 0 },
});

const CollectionInventorySetModel = mongoose.models.CollectionInventorySet || model<CollectionInventorySet>("CollectionInventorySet", schema, "collection_inventory_sets");

export default CollectionInventorySetModel as mongoose.Model<CollectionInventorySet>;
