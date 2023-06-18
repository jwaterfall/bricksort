import connectToDatabase from '@/data/connectToDatabase';
import SetModel, { Set } from '@/models/Set';
import { Theme } from '@/models/Theme';

export interface ExtendedSet extends Omit<Set, 'theme'> {
  theme: Theme;
}

const getSets = async () => {
  await connectToDatabase();

  const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];

  const sets = await SetModel.find({
    themeId: '158',
  })
    .sort({
      year: -1,
    })
    .limit(24)
    .populate('theme')
    .exec();

  return sets.map((set) => set.toJSON());
};

export default getSets;
