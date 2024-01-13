import mongoose, { Document, Model, Schema, model } from 'mongoose';

export interface Theme extends Document {
  _id: string;
  name: string;
  setCount: number;
  parentId: string | null;
}

interface ThemeModel extends Model<Theme> {
  getChildThemes(id: string): Promise<Theme[]>;
}

const schema = new Schema<Theme>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    parentId: { type: String },
  },
  { timestamps: true }
);

schema.statics.getChildThemes = async function (id: string) {
  const childThemes = await (this as ThemeModel).find({ parentId: id });
  const secondaryChildThemes = await Promise.all(childThemes.map((theme) => (this as ThemeModel).getChildThemes(theme._id)));

  return childThemes.concat(...secondaryChildThemes);
};

const ThemeModel = mongoose.models.Theme ?? model<Theme>('Theme', schema, 'themes');

export default ThemeModel as unknown as ThemeModel;
