import { FC } from "react";

import Pagination from "../../../components/Pagination";
import SetList from "../../../components/SetList";
import { PageProps } from "../../../types";
import SetModel, { ExtendedSet } from "../../../models/Set";
import connectToDatabase from "../../../data/connectToDatabase";
import ThemeModel from "../../../models/Theme";

const getSets = async (page = 1, limit = 20, search?: string, minYear?: number, maxYear?: number, themes?: string[]) => {
  connectToDatabase();
  const skip = (page - 1) * limit;
  // search both the _id and name fields using the search term if the search term is defined
  const query = {
    ...(search && { $or: [{ _id: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }] }),
    ...(minYear && { year: { $gte: minYear } }),
    ...(maxYear && { year: { $lte: maxYear } }),
    ...(themes && { theme: { $in: themes } }),
  };

  const sets = await SetModel.find(query).sort({ year: -1 }).limit(limit).skip(skip).populate("theme", undefined, ThemeModel).exec();
  const totalPageCount = Math.ceil((await SetModel.countDocuments(query).exec()) / limit);

  return {
    sets: sets as unknown as ExtendedSet[],
    totalPageCount,
  };
};

// @ts-expect-error
const Page: FC = async ({ searchParams }: PageProps) => {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search ? searchParams.search : undefined;
  const minYear = searchParams?.minYear ? parseInt(searchParams.minYear) : undefined;
  const maxYear = searchParams?.maxYear ? parseInt(searchParams.maxYear) : undefined;
  const themes = searchParams?.themes ? searchParams.themes.split(",") : undefined;
  const response = await getSets(page, 20, search, minYear, maxYear, themes);

  return (
    <div className="flex flex-col gap-4">
      <Pagination totalCount={response.totalPageCount} />
      <SetList sets={response.sets} />
      <Pagination totalCount={response.totalPageCount} />
    </div>
  );
};

export default Page;
