import mongoose, { Document, Schema, model } from "mongoose";

export interface CollectionInventoryPart extends Document {
  user: string;
  collectionInventory: string;
  inventoryPart: string;
  quantityFound: number;
}

const schema = new Schema<CollectionInventoryPart>({
  user: { type: String, required: true, index: true },
  collectionInventory: { type: String, required: true, ref: "CollectionInventory", index: true },
  inventoryPart: { type: String, required: true, ref: "InventoryPart", index: true },
  quantityFound: { type: Number, required: true, default: 0 },
});

const CollectionInventoryPartModel = mongoose.models.CollectionInventoryPart || model<CollectionInventoryPart>("CollectionInventoryPart", schema, "collection_inventory_parts");

export default CollectionInventoryPartModel as mongoose.Model<CollectionInventoryPart>;
