"use client";

import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { SearchParamValues } from "../hooks/useSetSearchParams";

interface SearchParamLinkProps {
  values: SearchParamValues;
}

const SearchParamLink: FC<PropsWithChildren<SearchParamLinkProps>> = ({ values, children }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const newSearchParams = new URLSearchParams(searchParams.toString());

  for (const [name, value] of Object.entries(values)) {
    if (value === undefined) {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, value.toString());
    }
  }

  return <Link href={`${pathName}?${newSearchParams.toString()}`}>{children}</Link>;
};

export default SearchParamLink;
