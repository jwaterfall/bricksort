import mongoose, { Document, Schema, model } from "mongoose";
import { ExtendedInventoryPart } from "./InventoryPart";

export interface CollectionInventoryPart extends Document {
    user: string;
    collectionInventory: Schema.Types.ObjectId;
    inventoryPart: Schema.Types.ObjectId;
    quantity: number;
    quantityFound: number;
}

export interface ExtendedCollectionInventoryPart extends Omit<CollectionInventoryPart, "inventoryPart"> {
    inventoryPart: ExtendedInventoryPart;
}

const schema = new Schema<CollectionInventoryPart>({
    user: { type: String, required: true, index: true },
    collectionInventory: { type: Schema.Types.ObjectId, required: true, ref: "CollectionInventory", index: true },
    inventoryPart: { type: Schema.Types.ObjectId, required: true, ref: "InventoryPart", index: true },
    quantity: { type: Number, required: true },
    quantityFound: { type: Number, required: true, default: 0 },
});

const CollectionInventoryPartModel =
    mongoose.models.CollectionInventoryPart || model<CollectionInventoryPart>("CollectionInventoryPart", schema, "collection_inventory_parts");

export default CollectionInventoryPartModel as mongoose.Model<CollectionInventoryPart>;
