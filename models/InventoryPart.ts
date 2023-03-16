import mongoose, { Document, Schema, model } from "mongoose";
import { Color } from "./Color";
import { Part } from "./Part";

export interface InventoryPart extends Document {
    inventory: string;
    part: string;
    color: string;
    quantity: number;
    isSpare: boolean;
    imageUrl?: string;
}

export interface ExtendedInventoryPart extends Omit<InventoryPart, "part" | "color"> {
    part: Part;
    color: Color;
}

const schema = new Schema<InventoryPart>({
    inventory: { type: String, required: true, ref: "Inventory" },
    part: { type: String, required: true, ref: "Part", index: true },
    color: { type: String, required: true, ref: "Color", index: true },
    quantity: { type: Number, required: true },
    isSpare: { type: Boolean, required: true },
    imageUrl: { type: String },
});

const InventoryPartModel = mongoose.models.InventoryPart || model<InventoryPart>("InventoryPart", schema, "inventory_parts");

export default InventoryPartModel as mongoose.Model<InventoryPart>;
