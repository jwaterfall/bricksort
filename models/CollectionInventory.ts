import mongoose, { Document, Schema, model } from "mongoose";

export interface CollectionInventory extends Document {
    user: string;
    inventory: string;
}

const schema = new Schema<CollectionInventory>({
    user: { type: String, required: true, index: true },
    inventory: { type: String, required: true, ref: "Inventory", index: true },
});

const CollectionInventoryModel =
    mongoose.models.CollectionInventory || model<CollectionInventory>("CollectionInventory", schema, "collection_inventories");

export default CollectionInventoryModel as mongoose.Model<CollectionInventory>;
