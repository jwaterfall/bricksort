import { FC, PropsWithChildren, useMemo } from "react";
import SearchParamLink from "./SearchParamLink";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ currentPage, pageCount, siblingCount = 2 }) => {
  interface PaginationButtonProps {
    page?: number;
    disabled?: boolean;
  }

  const PaginationButton: FC<PropsWithChildren<PaginationButtonProps>> = ({ page, disabled, children }) => {
    const active = !disabled && page === currentPage;

    return (
      <div className={"border-r border-slate-300 last:border-r-0 text-sm font-medium transition-colors"}>
        {disabled || !page ? (
          <div className="flex items-center justify-center w-10 h-10 cursor-default">{children}</div>
        ) : (
          <SearchParamLink values={{ page }}>
            <button
              className={`flex items-center justify-center w-10 h-10 hover:bg-red-400 hover:text-red-50 ${active ? "bg-red-500 text-red-50" : ""}`}
            >
              {children}
            </button>
          </SearchParamLink>
        )}
      </div>
    );
  };

  const DOTS = "...";

  const createRange = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const pages: (typeof DOTS | number)[] = useMemo(() => {
    if (pageCount <= 2 * siblingCount + 5) {
      return createRange(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = createRange(1, leftItemCount);

      return [...leftRange, DOTS, pageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = createRange(pageCount - rightItemCount + 1, pageCount);

      return [1, DOTS, ...rightRange];
    }

    const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, pageCount];
  }, [currentPage, pageCount, siblingCount]);

  return (
    <nav className="flex rounded-md bg-slate-50 w-fit border border-slate-300 overflow-hidden">
      <PaginationButton page={currentPage - 1} disabled={currentPage <= 1}>
        {"<"}
      </PaginationButton>

      {pages.map((page, index) => (
        <PaginationButton key={index} page={page === DOTS ? undefined : page} disabled={page === DOTS}>
          {page}
        </PaginationButton>
      ))}

      <PaginationButton page={currentPage + 1} disabled={currentPage >= pageCount}>
        {">"}
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
