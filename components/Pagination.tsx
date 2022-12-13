"use client";

import { FC, ButtonHTMLAttributes, useMemo } from "react";

import useSearchParamNumber from "../hooks/useSearchParamNumber";

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({ active, ...props }) => (
  <button
    {...props}
    className={`border-r border-slate-200 last:border-r-0 flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors hover:bg-red-400 hover:text-red-50 disabled:hover:bg-transparent disabled:hover:text-slate-900 ${
      active ? "bg-red-500 text-red-50" : ""
    }`}
  />
);

interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ totalCount, siblingCount = 2 }) => {
  const [currentPage, setCurrentPage] = useSearchParamNumber("page", 1);
  const DOTS = "...";

  const createRange = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const pages: (typeof DOTS | number)[] = useMemo(() => {
    if (totalCount <= 2 * siblingCount + 5) {
      return createRange(1, totalCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = createRange(1, leftItemCount);

      return [...leftRange, DOTS, totalCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = createRange(totalCount - rightItemCount + 1, totalCount);

      return [1, DOTS, ...rightRange];
    }

    const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, totalCount];
  }, [currentPage, totalCount, siblingCount]);

  return (
    <nav className="flex rounded-md bg-slate-50 w-fit border border-slate-200 overflow-hidden">
      <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>
        {"<"}
      </PaginationButton>
      {pages.map((page, index) => {
        if (page === DOTS) {
          return (
            <PaginationButton disabled key={index}>
              {DOTS}
            </PaginationButton>
          );
        }

        return (
          <PaginationButton key={index} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
          </PaginationButton>
        );
      })}
      <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalCount}>
        {">"}
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
