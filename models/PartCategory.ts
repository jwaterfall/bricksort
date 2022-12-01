import mongoose, { Document, Schema, model } from "mongoose";

export interface PartCategory extends Document {
  _id: number;
  name: string;
}

const schema = new Schema<PartCategory>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
});

const PartCategoryModel = mongoose.models.PartCategory || model<PartCategory>("PartCategory", schema, "partCategories");

export default PartCategoryModel as mongoose.Model<PartCategory>;
