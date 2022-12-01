import mongoose, { Document, Schema, model } from "mongoose";

export enum RelationshipType {
  PRINT = "P",
  PAIR = "R",
  SUBPART = "B",
  MOLD = "M",
  PATTERN = "T",
  ALTERNATE = "A",
}

export interface PartRelationship extends Document {
  relationshipType: RelationshipType;
  child: string;
  parent: string;
}

const schema = new Schema<PartRelationship>({
  relationshipType: { type: String, required: true, enum: Object.values(RelationshipType) },
  child: { type: String, required: true, ref: "Part" },
  parent: { type: String, required: true, ref: "Part" },
});

const PartRelationshipModel = mongoose.models.PartRelationship || model<PartRelationship>("PartRelationship", schema, "partRelationships");

export default PartRelationshipModel as mongoose.Model<PartRelationship>;
