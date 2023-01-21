import { FC } from "react";

import Pagination from "../../components/Pagination";
import SetList from "../../components/SetList";
import getSets from "../../data/getSets";
import { PageProps } from "../../types";

export const revalidate = 0;

// @ts-expect-error
const Page: FC = async ({ searchParams }: PageProps) => {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.search;
  const minYear = searchParams?.minYear ? parseInt(searchParams.minYear) : undefined;
  const maxYear = searchParams?.maxYear ? parseInt(searchParams.maxYear) : undefined;
  const themes = searchParams?.themes ? searchParams.themes.split(",") : undefined;

  const response = await getSets(page, 20, search, minYear, maxYear, themes);

  return (
    <div className="flex flex-col gap-4">
      <Pagination currentPage={page} pageCount={response.totalPageCount} />
      <SetList sets={response.sets} />
      <Pagination currentPage={page} pageCount={response.totalPageCount} />
    </div>
  );
};

export default Page;
