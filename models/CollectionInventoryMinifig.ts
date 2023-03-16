import mongoose, { Document, Schema, model } from "mongoose";

export interface CollectionInventoryMinifig extends Document {
    user: string;
    collectionInventory: Schema.Types.ObjectId;
    inventoryMinifig: Schema.Types.ObjectId;
    quantityFound: number;
}

const schema = new Schema<CollectionInventoryMinifig>({
    user: { type: String, required: true, index: true },
    collectionInventory: { type: Schema.Types.ObjectId, required: true, ref: "CollectionInventory", index: true },
    inventoryMinifig: { type: Schema.Types.ObjectId, required: true, ref: "InventoryMinifig", index: true },
    quantityFound: { type: Number, required: true, default: 0 },
});

const CollectionInventoryMinifigModel =
    mongoose.models.CollectionInventoryMinifig ||
    model<CollectionInventoryMinifig>("CollectionInventoryMinifig", schema, "collection_inventory_minifigs");

export default CollectionInventoryMinifigModel as mongoose.Model<CollectionInventoryMinifig>;
