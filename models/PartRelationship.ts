import mongoose, { Document, Schema, model } from 'mongoose';

export enum RelationshipType {
    PRINT = 'P',
    PAIR = 'R',
    SUBPART = 'B',
    MOLD = 'M',
    PATTERN = 'T',
    ALTERNATE = 'A',
}

export interface PartRelationship extends Document {
    _id: string;
    relationshipType: RelationshipType;
    child: string;
    parent: string;
}

const schema = new Schema<PartRelationship>({
    _id: { type: String, required: true },
    relationshipType: { type: String, required: true, enum: Object.values(RelationshipType) },
    child: { type: String, required: true, ref: 'Part', index: true },
    parent: { type: String, required: true, ref: 'Part', index: true },
});

const PartRelationshipModel = mongoose.models.PartRelationship || model<PartRelationship>('PartRelationship', schema, 'part_relationships');

export default PartRelationshipModel as mongoose.Model<PartRelationship>;
