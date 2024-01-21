import SetModel from '@/services/set/model';

// Exclude themes that are not relevant to the app
const excludedThemes = [
  '501',
  '739',
  '736',
  '408',
  '497',
  '688',
  '737',
  '503',
  '740',
  '733',
  '741',
  '398',
  '598',
  '746',
];

export async function getSets() {
  const sets = await SetModel.find({ themeId: { $nin: excludedThemes } })
    .sort({ year: -1, themeId: 1, name: 1 })
    .limit(60)
    .populate('theme');

  return sets.map((set) => set.toJSON());
}
