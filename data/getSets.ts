import SetModel, { ExtendedSet } from "../models/Set";
import ThemeModel from "../models/Theme";
import connectToDatabase from "./connectToDatabase";

const getSets = async (page = 1, limit = 20, search?: String, minYear?: number, maxYear?: number, themes?: string[]) => {
  connectToDatabase();
  const skip = (page - 1) * limit;

  const query = {
    ...(minYear && { year: { $gte: minYear } }),
    ...(maxYear && { year: { $lte: maxYear } }),
    ...(themes && { theme: { $in: themes } }),
    ...(search && { $or: [{ _id: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }] }),
  };

  const sets = await SetModel.find(query).sort({ year: -1 }).limit(limit).skip(skip).populate("theme", undefined, ThemeModel).exec();
  const totalPageCount = Math.ceil((await SetModel.countDocuments(query).exec()) / limit);

  return {
    sets: sets as unknown as ExtendedSet[],
    totalPageCount,
  };
};

export default getSets;
