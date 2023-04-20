import mongoose, { Document, Schema, model } from 'mongoose';

import { Part } from './Part';

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
    childId: string;
    parentId: string;
    child: Part;
    parent: Part;
}

const schema = new Schema<PartRelationship>({
    _id: { type: String, required: true },
    relationshipType: { type: String, required: true, enum: Object.values(RelationshipType) },
    childId: { type: String, required: true, index: true },
    parentId: { type: String, required: true, index: true },
});

const PartRelationshipModel = mongoose.models.PartRelationship ?? model<PartRelationship>('PartRelationship', schema, 'part_relationships');

export default PartRelationshipModel as mongoose.Model<PartRelationship>;
