import mongoose, { Document, Schema, model } from "mongoose";
import { ExtendedInventory } from "./Inventory";

export interface CollectionInventory extends Document {
    user: string;
    inventory: string;
}

export interface ExtendedCollectionInventory extends Omit<CollectionInventory, "inventory"> {
    inventory: ExtendedInventory;
}

const schema = new Schema<CollectionInventory>({
    user: { type: String, required: true, index: true },
    inventory: { type: String, required: true, ref: "Inventory", index: true },
});

const CollectionInventoryModel =
    mongoose.models.CollectionInventory || model<CollectionInventory>("CollectionInventory", schema, "collection_inventories");

export default CollectionInventoryModel as mongoose.Model<CollectionInventory>;
