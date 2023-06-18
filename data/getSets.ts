import connectToDatabase from '@/data/connectToDatabase';
import SetModel from '@/models/Set';

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
    .populate([
      {
        path: 'theme',
      },
    ])
    .exec();

  return sets.map((set) => set.toJSON());
};

export default getSets;
